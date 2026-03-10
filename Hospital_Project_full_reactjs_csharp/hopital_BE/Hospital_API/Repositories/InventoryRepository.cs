using Hospital_API.Models;
using Hospital_API.Interfaces;
using Hospital_API.Data;
using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Repositories
{
    public class InventoryRepository : IInventoryRepository
    {
        private readonly HospitalDbContext _context;
        public InventoryRepository(HospitalDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Inventory>> GetAllAsync()
        {
            return await _context.Inventories.Include(i => i.Medicine).ToListAsync();
        }

        public async Task<Inventory> GetByIdAsync(int id)
        {
            return await _context.Inventories.Include(i => i.Medicine).FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<Inventory> AddAsync(Inventory inventory)
        {
            await _context.Inventories.AddAsync(inventory);
            await _context.SaveChangesAsync();
            return inventory;
        }

        public async Task<Inventory> UpdateAsync(Inventory inventory)
        {
            _context.Inventories.Update(inventory);
            await _context.SaveChangesAsync();
            return inventory;
        }

        public async Task<Inventory> DeleteAsync(int id)
        {
            var inventory = await _context.Inventories.FindAsync(id);
            if (inventory != null)
            {
                _context.Inventories.Remove(inventory);
                await _context.SaveChangesAsync();
            }
            return inventory;
        }
    }
}