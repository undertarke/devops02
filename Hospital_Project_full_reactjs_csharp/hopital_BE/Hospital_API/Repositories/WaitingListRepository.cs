using Hospital_API.Models;
using Hospital_API.Interfaces;
using Hospital_API.Data;
using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Repositories
{
    public class WaitingListRepository : IWaitingListRepository
    {
        private readonly HospitalDbContext _context;
        public WaitingListRepository(HospitalDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<WaitingList>> GetAllAsync()
        {
            return await _context.WaitingLists
                .Include(w => w.Appointment)
                .ToListAsync();
        }

        public async Task<WaitingList> GetByIdAsync(int id)
        {
            return await _context.WaitingLists
                .Include(w => w.Appointment)
                .FirstOrDefaultAsync(w => w.Id == id);
        }

        public async Task<WaitingList> AddAsync(WaitingList waiting)
        {
            await _context.WaitingLists.AddAsync(waiting);
            await _context.SaveChangesAsync();
            return waiting;
        }

        public async Task<WaitingList> UpdateAsync(WaitingList waiting)
        {
            _context.WaitingLists.Update(waiting);
            await _context.SaveChangesAsync();
            return waiting;
        }

        public async Task<WaitingList> DeleteAsync(int id)
        {
            var waiting = await _context.WaitingLists.FindAsync(id);
            if (waiting != null)
            {
                _context.WaitingLists.Remove(waiting);
                await _context.SaveChangesAsync();
            }
            return waiting;
        }
    }
}