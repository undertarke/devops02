using Hospital_API.Data;
using Hospital_API.Interfaces;
using Hospital_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Repositories
{
    public class UserRoleRepository : IUserRoleRepository
{
    private readonly HospitalDbContext _context;

    public UserRoleRepository(HospitalDbContext context)
    {
        _context = context;
    }

    public async Task<List<UserRole>> GetByUserIdAsync(int userId)
    {
        return await _context.UserRoles
            .Where(ur => ur.UserId == userId)
            .Include(ur => ur.Role)
            .ToListAsync();
    }

    public async Task AddRangeAsync(List<UserRole> userRoles)
    {
        await _context.UserRoles.AddRangeAsync(userRoles);
    }

    public async Task RemoveRangeByUserIdAsync(int userId)
    {
        var existing = _context.UserRoles.Where(ur => ur.UserId == userId);
        _context.UserRoles.RemoveRange(existing);
    }

    public async Task<bool> RemoveAsync(int userId, int roleId)
    {
        var item = await _context.UserRoles
            .FirstOrDefaultAsync(ur => ur.UserId == userId && ur.RoleId == roleId);

        if (item == null) return false;

        _context.UserRoles.Remove(item);
        return await SaveChangesAsync();
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}

}