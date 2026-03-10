using Hospital_API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Interfaces
{
    public interface IInventoryRepository
    {
        Task<IEnumerable<Inventory>> GetAllAsync();
        Task<Inventory> GetByIdAsync(int id);
        Task<Inventory> AddAsync(Inventory inventory);
        Task<Inventory> UpdateAsync(Inventory inventory);
        Task<Inventory> DeleteAsync(int id);
    }
}