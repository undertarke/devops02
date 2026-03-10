using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Hospital_API.Models;

namespace Hospital_API.Services
{
    public class RoleService : IRoleService
    {
        private readonly IRoleRepository _repo;

        public RoleService(IRoleRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<RoleDTO>> GetAllRolesAsync()
        {
            var roles = await _repo.GetAllAsync();
            return roles.Select(r => new RoleDTO { Name = r.Name, Description = r.Description });
        }

        public async Task<RoleDTO?> GetRoleByIdAsync(int id)
        {
            var role = await _repo.GetByIdAsync(id);
            if (role == null) return null;

            return new RoleDTO { Name = role.Name, Description = role.Description };
        }

        public async Task AddRoleAsync(RoleDTO dto)
        {
            var role = new Role { Name = dto.Name, Description = dto.Description };
            await _repo.AddAsync(role);
        }

        public async Task UpdateRoleAsync(int id, RoleDTO dto)
        {
            var role = await _repo.GetByIdAsync(id);
            if (role == null) return;

            role.Name = dto.Name;
            role.Description = dto.Description;
            await _repo.UpdateAsync(role);
        }

        public async Task DeleteRoleAsync(int id)
        {
            await _repo.DeleteAsync(id);
        }
    }

}