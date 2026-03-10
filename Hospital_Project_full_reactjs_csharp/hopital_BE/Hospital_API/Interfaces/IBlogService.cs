using Hospital_API.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Interfaces
{
    public interface IBlogService
    {
        Task<IEnumerable<BlogDTO>> GetAllAsync();
        Task<IEnumerable<BlogDTO>> GetAllForAdminAsync();
        Task<BlogDTO?> GetByIdAsync(int id);
        Task<BlogDTO> CreateAsync(BlogCreateDTO blogCreateDto);
        Task<BlogDTO?> UpdateAsync(int id, BlogUpdateDTO blogUpdateDto);
        Task<bool> DeleteAsync(int id);
    }
} 