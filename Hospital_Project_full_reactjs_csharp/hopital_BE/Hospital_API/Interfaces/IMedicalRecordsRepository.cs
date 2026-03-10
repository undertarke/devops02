using Hospital_API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Interfaces
{
    public interface IMedicalRecordsRepository
    {
        Task<IEnumerable<MedicalRecord>> GetAllAsync();
        Task<MedicalRecord> GetByIdAsync(int id);
        Task<MedicalRecord> AddAsync(MedicalRecord record);
        Task<MedicalRecord> UpdateAsync(MedicalRecord record);
        Task<MedicalRecord> DeleteAsync(int id);
    }
}