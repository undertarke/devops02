using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Hospital_API.Models;

namespace Hospital_API.Services
{
    public class PermissionService : IPermissionService
    {
        private readonly IPermissionRepository _permissionRepository;

        public PermissionService(IPermissionRepository permissionRepository)
        {
            _permissionRepository = permissionRepository;
        }

        public async Task<List<PermissionDto>> GetAllAsync()
        {
            var permissions = await _permissionRepository.GetAllAsync();
            return permissions.Select(p => new PermissionDto
            {
                Id = p.Id,
                Name = p.Name,
                Code = p.Code,
                Description = p.Description
            }).ToList();
        }

        public async Task<PermissionDto?> GetByIdAsync(int id)
        {
            var permission = await _permissionRepository.GetByIdAsync(id);
            if (permission == null) return null;

            return new PermissionDto
            {
                Id = permission.Id,
                Name = permission.Name,
                Code = permission.Code,
                Description = permission.Description
            };
        }

        public async Task<bool> CreateAsync(PermissionCreateDto dto)
        {
            var permission = new Permission
            {
                Name = dto.Name,
                Code = dto.Code,
                Description = dto.Description
            };

            await _permissionRepository.AddAsync(permission);
            return await _permissionRepository.SaveChangesAsync();
        }

        public async Task<bool> UpdateAsync(PermmissionUpdateDTO dto)
        {
            var permission = await _permissionRepository.GetByIdAsync(dto.Id);
            if (permission == null) return false;

            permission.Name = dto.Name;
            permission.Code = dto.Code;
            permission.Description = dto.Description;

            _permissionRepository.Update(permission);
            return await _permissionRepository.SaveChangesAsync();
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var permission = await _permissionRepository.GetByIdAsync(id);
            if (permission == null) return false;

            _permissionRepository.Delete(permission);
            return await _permissionRepository.SaveChangesAsync();
        }
    }


}