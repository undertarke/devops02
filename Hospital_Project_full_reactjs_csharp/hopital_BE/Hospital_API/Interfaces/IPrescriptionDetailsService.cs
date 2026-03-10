using Hospital_API.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Interfaces
{
    public interface IPrescriptionDetailsService
    {
        Task<IEnumerable<PrescriptionDetailsDTO>> GetAllAsync();
        Task<PrescriptionDetailsDTO> GetByIdAsync(int id);
        Task<PrescriptionDetailsDTO> AddAsync(PrescriptionDetailsDTO dto);
        Task<PrescriptionDetailsDTO> UpdateAsync(PrescriptionDetailsDTO dto);
        Task<PrescriptionDetailsDTO> DeleteAsync(int id);
    }
}