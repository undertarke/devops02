using Hospital_API.DTOs;

namespace Hospital_API.Interfaces
{
    public interface IDoctorScheduleRepository
{
    Task<IEnumerable<DoctorSchedule>> GetAllAsync();
    Task<IEnumerable<DoctorSchedule>> GetByDoctorIdAsync(int doctorId);
    Task<DoctorSchedule?> GetByIdAsync(int id);
    Task AddAsync(DoctorSchedule schedule);
    Task UpdateAsync(DoctorSchedule schedule);
    Task DeleteAsync(DoctorSchedule schedule);
}

}