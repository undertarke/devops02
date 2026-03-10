using Hospital_API.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Interfaces
{
    public interface IPrescriptionsService
    {
        Task<IEnumerable<PrescriptionsDTO>> GetAllAsync();
        Task<PrescriptionsDTO> GetByIdAsync(int id);
        Task<PrescriptionsDTO> AddAsync(PrescriptionsDTO dto);
        Task<PrescriptionsDTO> UpdateAsync(PrescriptionsDTO dto);
        Task<PrescriptionsDTO> DeleteAsync(int id);
    }
}