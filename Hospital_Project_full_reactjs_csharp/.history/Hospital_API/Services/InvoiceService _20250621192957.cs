using Hospital_API.Data;
using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Hospital_API.Models;

namespace Hospital_API.Services
{
    public class InvoiceService : IInvoiceService
    {
        private readonly IInvoiceRepository _repo;
        private readonly HospitalDbContext _context;


        public InvoiceService(IInvoiceRepository repo,HospitalDbContext context)
        {
            _repo = repo;
                _context = context;

        }

        public async Task<IEnumerable<InvoiceDTO>> GetAllAsync()
        {
            var entities = await _repo.GetAllAsync();
            return entities.Select(e => MapToDTO(e));
        }

        public async Task<InvoiceDTO?> GetByIdAsync(int id)
        {
            var entity = await _repo.GetByIdAsync(id);
            return entity == null ? null : MapToDTO(entity);
        }

        public async Task<InvoiceDTO?> GetByAppointmentIdAsync(int appointmentId)
        {
            var entity = await _repo.GetByAppointmentIdAsync(appointmentId);
            return entity == null ? null : MapToDTO(entity);
        }

        public async Task<InvoiceDTO> CreateAsync(InvoiceCreateDTO dto)
        {
            // Lấy thông tin Appointment kèm theo PatientId
            var appointment = await _repo.Appointments
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.Id == dto.AppointmentId);

            if (appointment == null)
                throw new Exception("Appointment not found");


            var invoice = new Invoice
            {
                AppointmentId = dto.AppointmentId,
                PatientId = appointment.PatientId, 
                TotalAmount = dto.TotalAmount,
                Status = string.IsNullOrEmpty(dto.Status) ? "Unpaid" : dto.Status,
                Note = dto.Note,
                IssuedDate = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow
            };

            await _repo.AddAsync(invoice);
            return MapToDTO(invoice);
        }

        public async Task<InvoiceDTO?> UpdateAsync(InvoiceUpdateDTO dto)
        {
            var entity = await _repo.GetByIdAsync(dto.Id);
            if (entity == null) return null;

            entity.TotalAmount = dto.TotalAmount;
            entity.Status = dto.Status;
            entity.Note = dto.Notes;

            await _repo.UpdateAsync(entity);
            return MapToDTO(entity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _repo.GetByIdAsync(id);
            if (entity == null) return false;

            await _repo.DeleteAsync(entity);
            return true;
        }

        private InvoiceDTO MapToDTO(Invoice entity)
        {
            return new InvoiceDTO
            {
                Id = entity.Id,
                AppointmentId = entity.AppointmentId,
                TotalAmount = entity.TotalAmount,
                Status = entity.Status,
                Note = entity.Note,
                CreatedAt = entity.CreatedAt
            };
        }
    }

}
