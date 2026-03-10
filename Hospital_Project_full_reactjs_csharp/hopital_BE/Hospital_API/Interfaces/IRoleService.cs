using Hospital_API.DTOs;

namespace Hospital_API.Interfaces
{
    public interface IRoleService
    {
        Task<IEnumerable<RoleDTO>> GetAllRolesAsync();
        Task<RoleDTO?> GetRoleByIdAsync(int id);
        Task AddRoleAsync(RoleDTO roleDto);
        Task UpdateRoleAsync(int id, RoleDTO roleDto);
        Task DeleteRoleAsync(int id);
    }

}