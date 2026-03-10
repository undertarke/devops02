using System.Collections.Generic;
using System.Threading.Tasks;
using Hospital_API.Models;

namespace Hospital_API.Interfaces
{
    public interface IBranchRepository
    {
        Task<IEnumerable<Branch>> GetAllAsync();
        Task<Branch> GetByIdAsync(int id);
        Task<Branch> AddAsync(Branch branch);
        Task<Branch> UpdateAsync(Branch branch);
        Task<Branch> DeleteAsync(int id);
    }
}