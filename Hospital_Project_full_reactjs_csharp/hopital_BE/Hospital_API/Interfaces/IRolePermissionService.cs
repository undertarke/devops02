using Hospital_API.DTOs;

namespace Hospital_API.Interfaces
{
    public interface IRolePermissionService
{
    Task<bool> AssignPermissionsAsync(AssignPermissionsDto dto);
    Task<List<PermissionDto>> GetPermissionsByRoleIdAsync(int roleId);
    Task<bool> RemovePermissionAsync(int roleId, int permissionId);
}

}