using Hospital_API.Models;

namespace Hospital_API.Interfaces
{
    public interface IBlogRepository
    {
        Task<IEnumerable<Blog>> GetAllAsync();
        Task<Blog?> GetByIdAsync(int id);
        Task<Blog> CreateAsync(Blog blog);
        Task<Blog?> UpdateAsync(Blog blog);
        Task<bool> DeleteAsync(int id);
    }
} 