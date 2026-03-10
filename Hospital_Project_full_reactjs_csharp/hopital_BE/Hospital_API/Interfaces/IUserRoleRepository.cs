using Hospital_API.Models;

namespace Hospital_API.Interfaces
{
    public interface IUserRoleRepository
{
    Task<List<UserRole>> GetByUserIdAsync(int userId);
    Task AddRangeAsync(List<UserRole> userRoles);
    Task RemoveRangeByUserIdAsync(int userId);
    Task<bool> RemoveAsync(int userId, int roleId);
    Task<bool> SaveChangesAsync();
}

}