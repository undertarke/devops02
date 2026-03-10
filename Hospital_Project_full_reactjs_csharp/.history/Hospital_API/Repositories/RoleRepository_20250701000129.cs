using Hospital_API.Data;
using Hospital_API.Interfaces;
using Hospital_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly HospitalDbContext _context;

        public RoleRepository(HospitalDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Role>> GetAllAsync() => await _context.Roles.ToListAsync();

public async Task<Role?> GetByIdAsync(int id)
    => await _context.Roles.FirstOrDefaultAsync(r => r.Id == id);

        public async Task AddAsync(Role role)
        {
            _context.Roles.Add(role);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateAsync(Role role)
        {
            _context.Roles.Update(role);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var role = await _context.Roles.FindAsync(id);
            if (role != null)
            {
                _context.Roles.Remove(role);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<Role?> GetByNameAsync(string name)
        {
            return await _context.Roles.FirstOrDefaultAsync(r => r.Name == name);
        }
    }
}