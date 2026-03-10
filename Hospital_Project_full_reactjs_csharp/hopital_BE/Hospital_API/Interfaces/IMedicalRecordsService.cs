using Hospital_API.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Interfaces
{
    public interface IMedicalRecordsService
    {
        Task<IEnumerable<MedicalRecordsDTO>> GetAllAsync();
        Task<MedicalRecordsDTO> GetByIdAsync(int id);
        Task<MedicalRecordsDTO> AddAsync(MedicalRecordsDTO dto);
        Task<MedicalRecordsDTO> UpdateAsync(MedicalRecordsDTO dto);
        Task<MedicalRecordsDTO> DeleteAsync(int id);
    }
}