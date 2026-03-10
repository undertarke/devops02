using Hospital_API.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Interfaces
{
    public interface IInventoryService
    {
        Task<IEnumerable<InventoryDTO>> GetAllAsync();
        Task<InventoryDTO> GetByIdAsync(int id);
        Task<InventoryDTO> AddAsync(InventoryDTO dto);
        Task<InventoryDTO> UpdateAsync(InventoryDTO dto);
        Task<InventoryDTO> DeleteAsync(int id);
    }
}