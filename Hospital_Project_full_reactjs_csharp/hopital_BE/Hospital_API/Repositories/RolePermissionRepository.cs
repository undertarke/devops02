using Hospital_API.Data;
using Hospital_API.Interfaces;
using Hospital_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Repositories
{
    public class RolePermissionRepository : IRolePermissionRepository
{
    private readonly HospitalDbContext _context;

    public RolePermissionRepository(HospitalDbContext context)
    {
        _context = context;
    }

    public async Task<List<RolePermission>> GetByRoleIdAsync(int roleId)
    {
        return await _context.RolePermissions
            .Where(rp => rp.RoleId == roleId)
            .Include(rp => rp.Permission)
            .ToListAsync();
    }

    public async Task AddRangeAsync(List<RolePermission> rolePermissions)
    {
        await _context.RolePermissions.AddRangeAsync(rolePermissions);
    }

    public async Task RemoveRangeByRoleIdAsync(int roleId)
    {
        var existing = _context.RolePermissions
            .Where(rp => rp.RoleId == roleId);
        _context.RolePermissions.RemoveRange(existing);
    }

    public async Task<bool> RemoveAsync(int roleId, int permissionId)
    {
        var item = await _context.RolePermissions
            .FirstOrDefaultAsync(rp => rp.RoleId == roleId && rp.PermissionId == permissionId);

        if (item == null)
            return false;

        _context.RolePermissions.Remove(item);
        return await SaveChangesAsync();
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}

}