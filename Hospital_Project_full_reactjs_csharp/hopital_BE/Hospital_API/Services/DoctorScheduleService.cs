using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Hospital_API.Models;

namespace Hospital_API.Services
{
    public class DoctorScheduleService : IDoctorScheduleService
    {
        private readonly IDoctorScheduleRepository _repo;
        private readonly IDoctorRepository _doctorRepo;
        private readonly IRoomRepository _roomRepo;

        public DoctorScheduleService(
            IDoctorScheduleRepository repo,
            IDoctorRepository doctorRepo,
            IRoomRepository roomRepo)
        {
            _repo = repo;
            _doctorRepo = doctorRepo;
            _roomRepo = roomRepo;
        }

        public async Task<IEnumerable<DoctorScheduleDTO>> GetAllAsync()
        {
            var entities = await _repo.GetAllAsync();
            return entities.Select(MapToDTO);
        }

        public async Task<IEnumerable<DoctorScheduleDTO>> GetByDoctorIdAsync(int doctorId)
        {
            var entities = await _repo.GetByDoctorIdAsync(doctorId);
            return entities.Select(MapToDTO);
        }

        public async Task<DoctorScheduleDTO?> GetByIdAsync(int id)
        {
            var entity = await _repo.GetByIdAsync(id);
            return entity == null ? null : MapToDTO(entity);
        }

        public async Task<DoctorScheduleDTO> CreateAsync(DoctorScheduleCreateDTO dto)
        {
            // Validate Doctor
            var doctor = await _doctorRepo.GetByIdAsync(dto.DoctorId);
            if (doctor == null)
                throw new ArgumentException("Doctor not found");

            // Validate Room
            var room = await _roomRepo.GetByIdAsync(dto.RoomId);
            if (room == null)
                throw new ArgumentException("Room not found");

            // Validate thời gian
            if (dto.StartTime >= dto.EndTime)
                throw new ArgumentException("StartTime must be earlier than EndTime");

            var entity = new DoctorSchedule
            {
                DoctorId = dto.DoctorId,
                RoomId = dto.RoomId,
                Date = dto.Date,
                StartTime = dto.StartTime,
                EndTime = dto.EndTime,
                Status = dto.Status,
                Note = dto.Note
            };

            await _repo.AddAsync(entity);
            entity.Doctor = doctor;
            entity.Room = room;

            return MapToDTO(entity);
        }

        public async Task<DoctorScheduleDTO?> UpdateAsync(int id, DoctorScheduleCreateDTO dto)
        {
            var entity = await _repo.GetByIdAsync(id);
            if (entity == null) return null;

            var doctor = await _doctorRepo.GetByIdAsync(dto.DoctorId);
            if (doctor == null)
                throw new ArgumentException("Doctor not found");

            var room = await _roomRepo.GetByIdAsync(dto.RoomId);
            if (room == null)
                throw new ArgumentException("Room not found");

            if (dto.StartTime >= dto.EndTime)
                throw new ArgumentException("StartTime must be earlier than EndTime");

            entity.DoctorId = dto.DoctorId;
            entity.RoomId = dto.RoomId;
            entity.Date = dto.Date;
            entity.StartTime = dto.StartTime;
            entity.EndTime = dto.EndTime;
            entity.Status = dto.Status;
            entity.Note = dto.Note;

            await _repo.UpdateAsync(entity);
            entity.Doctor = doctor;
            entity.Room = room;

            return MapToDTO(entity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _repo.GetByIdAsync(id);
            if (entity == null) return false;

            await _repo.DeleteAsync(entity);
            return true;
        }

        private DoctorScheduleDTO MapToDTO(DoctorSchedule entity)
        {
            return new DoctorScheduleDTO
            {
                Id = entity.Id,
                DoctorId = entity.DoctorId,
                DoctorName = entity.Doctor?.User.FullName,
                Date = entity.Date, 
                RoomId = entity.RoomId,
                RoomName = entity.Room?.Name,
                StartTime = entity.StartTime,
                EndTime = entity.EndTime,
                Status = entity.Status,
                Note = entity.Note
            };
        }
    }

}