using System.Linq.Expressions;
using Hospital_API.DTOs;
using Hospital_API.Models;

namespace Hospital_API.Repositories.Interfaces
{
    public interface IAppointmentRepository
    {
        Task<IEnumerable<Appointment>> GetAllAsync();
        Task<Appointment?> GetByIdAsync(int id);
        Task<IEnumerable<Appointment>> GetByDoctorIdAsync(int doctorId);
        Task<IEnumerable<Appointment>> GetByPatientIdAsync(int patientId);
        Task AddAsync(Appointment appointment);
        Task UpdateAsync(Appointment appointment);
        Task DeleteAsync(int id);
        Task<bool> ExistsAsync(int id);

        Task<List<Appointment>> FindAsync(Expression<Func<Appointment, bool>> predicate);

        Task<IEnumerable<Appointment>> GetByDoctorAndDateAsync(int doctorId, DateTime date);

    }
}
