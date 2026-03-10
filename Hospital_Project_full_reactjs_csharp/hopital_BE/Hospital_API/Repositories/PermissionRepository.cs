using Hospital_API.Data;
using Hospital_API.Interfaces;
using Hospital_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Repositories{
    public class PermissionRepository : IPermissionRepository
{
    private readonly HospitalDbContext _context;

    public PermissionRepository(HospitalDbContext context)
    {
        _context = context;
    }

    public async Task<List<Permission>> GetAllAsync()
    {
        return await _context.Permissions.ToListAsync();
    }

    public async Task<Permission?> GetByIdAsync(int id)
    {
        return await _context.Permissions.FindAsync(id);
    }

    public async Task AddAsync(Permission permission)
    {
        await _context.Permissions.AddAsync(permission);
    }

    public void Update(Permission permission)
    {
        _context.Permissions.Update(permission);
    }

    public void Delete(Permission permission)
    {
        _context.Permissions.Remove(permission);
    }

    public async Task<bool> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<List<Permission>> GetByRoleIdAsync(int roleId)
    {
        return await _context.RolePermissions
            .Where(rp => rp.RoleId == roleId)
            .Select(rp => rp.Permission)
            .ToListAsync();
    }
}

}