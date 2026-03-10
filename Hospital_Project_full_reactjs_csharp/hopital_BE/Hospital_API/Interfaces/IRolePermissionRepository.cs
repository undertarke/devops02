using Hospital_API.Models;

namespace Hospital_API.Interfaces
{
    public interface IRolePermissionRepository
{
    Task<List<RolePermission>> GetByRoleIdAsync(int roleId);
    Task AddRangeAsync(List<RolePermission> rolePermissions);
    Task RemoveRangeByRoleIdAsync(int roleId);
    Task<bool> RemoveAsync(int roleId, int permissionId);
    Task<bool> SaveChangesAsync();
}

}