
using Hospital_API.DTOs;

namespace Hospital_API.Interfaces
{
    public interface IPermissionService
    {
        Task<List<PermissionDto>> GetAllAsync();
        Task<PermissionDto?> GetByIdAsync(int id);
        Task<bool> CreateAsync(PermissionCreateDto dto);
        Task<bool> UpdateAsync(PermmissionUpdateDTO dto);
        Task<bool> DeleteAsync(int id);
    }
}