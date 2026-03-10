using Hospital_API.Models;
using Hospital_API.DTOs;
namespace Hospital_API.Interfaces
{
    public interface IAuthRepository
    {
        Task<User?> GetUserByUsernameAsync(string username);
        Task CreateUserAsync(User user);
        Task SaveChangesAsync();
        Task<User?> GetByIdAsync(int id);
        Task<User?> GetUserByEmailAsync(string email);
        Task<User?> GetUserByResetTokenAsync(string token);


    }

}