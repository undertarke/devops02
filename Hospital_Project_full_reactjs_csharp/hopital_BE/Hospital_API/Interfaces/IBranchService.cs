using System.Collections.Generic;
using System.Threading.Tasks;
using Hospital_API.DTOs;

namespace Hospital_API.Interfaces
{
    public interface IBranchService
    {
        Task<IEnumerable<BranchDTO>> GetAllAsync();
        Task<BranchDTO> GetByIdAsync(int id);
        Task<BranchDTO> AddAsync(BranchCreateDTO dto);
        Task<BranchDTO> UpdateAsync(BranchDTO dto);
        Task<BranchDTO> DeleteAsync(int id);
    }
}