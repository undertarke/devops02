using Hospital_API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Interfaces
{
    public interface IPrescriptionDetailsRepository
    {
        Task<IEnumerable<PrescriptionDetails>> GetAllAsync();
        Task<PrescriptionDetails> GetByIdAsync(int id);
        Task<IEnumerable<PrescriptionDetails>> GetByPrescriptionIdAsync(int prescriptionId);
        Task<PrescriptionDetails> AddAsync(PrescriptionDetails detail);
        Task<PrescriptionDetails> UpdateAsync(PrescriptionDetails detail);
        Task<PrescriptionDetails> DeleteAsync(int id);
    }
}