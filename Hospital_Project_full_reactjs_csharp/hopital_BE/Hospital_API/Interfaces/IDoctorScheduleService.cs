using Hospital_API.DTOs;

namespace Hospital_API.Interfaces
{
    public interface IDoctorScheduleService
{
    Task<IEnumerable<DoctorScheduleDTO>> GetAllAsync();
    Task<IEnumerable<DoctorScheduleDTO>> GetByDoctorIdAsync(int doctorId);
    Task<DoctorScheduleDTO?> GetByIdAsync(int id);
    Task<DoctorScheduleDTO> CreateAsync(DoctorScheduleCreateDTO dto);
    Task<DoctorScheduleDTO?> UpdateAsync(int id, DoctorScheduleCreateDTO dto);
    Task<bool> DeleteAsync(int id);
}

}