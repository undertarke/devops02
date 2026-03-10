using Hospital_API.DTOs;

namespace Hospital_API.Interfaces{
    public interface IUserRoleService
{
    Task<bool> AssignRolesAsync(AssignRolesDto dto);
    Task<List<UserRoleDTO>> GetRolesByUserIdAsync(int userId);
    Task<bool> RemoveRoleAsync(int userId, int roleId);
}

}