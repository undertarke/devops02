using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Hospital_API.Models;

namespace Hospital_API.Services
{
    public class RolePermissionService : IRolePermissionService
{
    private readonly IRolePermissionRepository _repo;

    public RolePermissionService(IRolePermissionRepository repo)
    {
        _repo = repo;
    }

    public async Task<bool> AssignPermissionsAsync(AssignPermissionsDto dto)
    {
        await _repo.RemoveRangeByRoleIdAsync(dto.RoleId);

        var newPermissions = dto.PermissionIds
            .Distinct()
            .Select(pid => new RolePermission
            {
                RoleId = dto.RoleId,
                PermissionId = pid
            }).ToList();

        await _repo.AddRangeAsync(newPermissions);
        return await _repo.SaveChangesAsync();
    }

    public async Task<List<PermissionDto>> GetPermissionsByRoleIdAsync(int roleId)
    {
        var rolePermissions = await _repo.GetByRoleIdAsync(roleId);
        return rolePermissions.Select(rp => new PermissionDto
        {
            Id = rp.Permission.Id,
            Name = rp.Permission.Name,
            Code = rp.Permission.Code,
            Description = rp.Permission.Description
        }).ToList();
    }

    public async Task<bool> RemovePermissionAsync(int roleId, int permissionId)
    {
        return await _repo.RemoveAsync(roleId, permissionId);
    }
}

}