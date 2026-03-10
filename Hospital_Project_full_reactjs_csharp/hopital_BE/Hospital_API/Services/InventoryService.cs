using Hospital_API.Interfaces;
using Hospital_API.Models;
using Hospital_API.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_API.Services
{
    public class InventoryService : IInventoryService
    {
        private readonly IInventoryRepository _repo;
        public InventoryService(IInventoryRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<InventoryDTO>> GetAllAsync()
        {
            var inventories = await _repo.GetAllAsync();
            return inventories.Select(MapToDTO);
        }

        public async Task<InventoryDTO> GetByIdAsync(int id)
        {
            var inventory = await _repo.GetByIdAsync(id);
            return inventory == null ? null : MapToDTO(inventory);
        }

        public async Task<InventoryDTO> AddAsync(InventoryDTO dto)
        {
            var inventory = new Inventory
            {
                MedicineID = dto.MedicineID,
                Stock = dto.Stock,
                LastUpdated = dto.LastUpdated
            };
            var result = await _repo.AddAsync(inventory);
            return MapToDTO(result);
        }

        public async Task<InventoryDTO> UpdateAsync(InventoryDTO dto)
        {
            var inventory = new Inventory
            {
                Id = dto.Id,
                MedicineID = dto.MedicineID,
                Stock = dto.Stock,
                LastUpdated = dto.LastUpdated
            };
            var result = await _repo.UpdateAsync(inventory);
            return MapToDTO(result);
        }

        public async Task<InventoryDTO> DeleteAsync(int id)
        {
            var result = await _repo.DeleteAsync(id);
            return result == null ? null : MapToDTO(result);
        }

        private InventoryDTO MapToDTO(Inventory inventory)
        {
            return new InventoryDTO
            {
                Id = inventory.Id,
                MedicineID = inventory.MedicineID,
                Stock = inventory.Stock,
                LastUpdated = inventory.LastUpdated
            };
        }
    }
}