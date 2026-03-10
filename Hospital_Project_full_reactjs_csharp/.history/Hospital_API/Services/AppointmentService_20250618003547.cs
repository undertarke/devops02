using Hospital_API.Data;
using Hospital_API.DTOs;
using Hospital_API.Models;
using Hospital_API.Repositories.Interfaces;
using Hospital_API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Services
{
    public class AppointmentService : IAppointmentService
    {
        private readonly IAppointmentRepository _appointmentRepo;
        private readonly HospitalDbContext _context;

        public AppointmentService(IAppointmentRepository appointmentRepo, HospitalDbContext context)
        {
            _appointmentRepo = appointmentRepo;
            _context = context;
        }

        public async Task<IEnumerable<AppointmentDTO>> GetAllAsync()
        {
            var appointments = await _appointmentRepo.GetAllAsync();
            return appointments.Select(a => new AppointmentDTO
            {
                Id = a.Id,
                PatientName = a.Patient.User.FullName,
                DoctorName = a.Doctor.User.FullName,
                BranchName = a.Branch.Name,
                AppointmentDate = a.AppointmentDate,
                StartTime = a.StartTime,
                EndTime = a.EndTime,
                Status = a.Status,
                Note = a.Note
            });
        }

        public async Task<AppointmentDTO?> GetByIdAsync(int id)
        {
            var a = await _appointmentRepo.GetByIdAsync(id);
            if (a == null) return null;

            return new AppointmentDTO
            {
                Id = a.Id,
                PatientName = a.Patient?.User?.FullName ?? "",
    DoctorName = a.Doctor?.User?.FullName ?? "",
    BranchName = a.Branch?.Name ?? "",
                AppointmentDate = a.AppointmentDate,
                StartTime = a.StartTime,
                EndTime = a.EndTime,
                Status = a.Status,
                Note = a.Note
            };
        }

        public async Task<AppointmentDTO> CreateAsync(AppointmentCreateDTO dto)
        {
            // 1. Validate thời gian
            if (dto.StartTime >= dto.EndTime)
                throw new InvalidOperationException("Giờ bắt đầu phải nhỏ hơn giờ kết thúc.");

            // 2. Kiểm tra trùng giờ
            var conflict = await _appointmentRepo.FindAsync(a =>
                a.DoctorId == dto.DoctorId &&
                a.AppointmentDate == dto.AppointmentDate.Date &&
                a.Status != "Cancelled" && (
                    (dto.StartTime >= a.StartTime && dto.StartTime < a.EndTime) ||
                    (dto.EndTime > a.StartTime && dto.EndTime <= a.EndTime) ||
                    (dto.StartTime <= a.StartTime && dto.EndTime >= a.EndTime)
                )
            );

            if (conflict.Any())
                throw new InvalidOperationException("Thời gian đã bị trùng với lịch hẹn khác của bác sĩ.");

            // 3. Tạo entity
            var appointment = new Appointment
            {
                PatientId = dto.PatientId,
                DoctorId = dto.DoctorId,
                BranchId = dto.BranchId,
                AppointmentDate = dto.AppointmentDate.Date,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                Status = "Pending",
                Note = dto.Note
            };

            await _appointmentRepo.AddAsync(appointment);

            return await GetByIdAsync(appointment.Id) ?? throw new Exception("Tạo lịch hẹn thất bại.");
        }


        public async Task<bool> CancelAsync(int id)
        {
            var a = await _appointmentRepo.GetByIdAsync(id);
            if (a == null) return false;

            a.Status = "Cancelled";
            await _appointmentRepo.UpdateAsync(a);
            return true;
        }

        public async Task<bool> ConfirmAsync(int id)
        {
            var a = await _appointmentRepo.GetByIdAsync(id);
            if (a == null) return false;

            a.Status = "Confirmed";
            await _appointmentRepo.UpdateAsync(a);
            return true;
        }

     
        public async Task<IEnumerable<AppointmentDTO>> GetByDoctorAndDateAsync(int doctorId, DateTime date)
        {
            var appointments = await _appointmentRepo.GetByDoctorAndDateAsync(doctorId, date);

            // Map Appointment -> AppointmentDTO
            return appointments.Select(a => new AppointmentDTO
            {
                Id = a.Id,
                PatientId = a.PatientId,
                DoctorId = a.DoctorId,
                BranchId = a.BranchId,
                AppointmentDate = a.AppointmentDate,
                StartTime = a.StartTime,
                EndTime = a.EndTime,
                Status = a.Status,
                Note = a.Note
            });
        }

        // Tính các khung giờ trống theo bác sĩ và ngày
        public async Task<IEnumerable<TimeSpan>> GetAvailableTimeSlotsAsync(int doctorId, DateTime date)
        {
            var appointments = await _appointmentRepo.GetByDoctorAndDateAsync(doctorId, date);

            // Giả sử khung làm việc của bác sĩ từ 8:00 đến 17:00, mỗi slot 30 phút
            var workStart = new TimeSpan(8, 0, 0);
            var workEnd = new TimeSpan(17, 0, 0);
            var slotDuration = TimeSpan.FromMinutes(30);

            var slots = new List<TimeSpan>();
            for (var time = workStart; time + slotDuration <= workEnd; time += slotDuration)
            {
                slots.Add(time);
            }

            // Lọc những slot đã bị đặt rồi
            var bookedSlots = appointments.Select(a => a.StartTime).ToHashSet();

            var availableSlots = slots.Where(s => !bookedSlots.Contains(s));

            return availableSlots;
        }
    }
}
