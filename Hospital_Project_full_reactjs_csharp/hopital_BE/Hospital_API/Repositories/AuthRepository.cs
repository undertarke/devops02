using Hospital_API.Data;
using Hospital_API.Interfaces;
using Hospital_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly HospitalDbContext _context;

        public AuthRepository(HospitalDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(u => u.UserRoles)
                    .ThenInclude(ur => ur.Role)
                .FirstOrDefaultAsync(u => u.Username == username);
        }
        public async Task CreateUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }
        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User?> GetUserByResetTokenAsync(string token)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.ResetToken == token && u.ResetTokenExpired > DateTime.UtcNow);
        }



    }
}