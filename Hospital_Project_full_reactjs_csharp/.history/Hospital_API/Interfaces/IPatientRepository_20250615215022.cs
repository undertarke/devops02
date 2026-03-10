using Hospital_API.Models;

namespace Hospital_API.Interfaces
{
    public interface IPatientRepository
    {
        Task<List<Patient>> GetAllAsync();
        Task<Patient?> GetByIdAsync(int id);
        Task AddAsync(Patient patient);
        void Update(Patient patient);
        void Delete(Patient patient);
        Task<bool> SaveChangesAsync();
    }
}