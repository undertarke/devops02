using Hospital_API.DTOs;

namespace Hospital_API.Interfaces
{
    public interface IUserService
    {
        Task<UserResponse?> GetByIdAsync(int id);
        Task<List<UserResponse>> GetAllAsync();
        Task<UserResponse> CreateAsync(UserCreateDto dto);
        Task<bool> UpdateAsync(int id, UserUpdateDto dto);
        Task<bool> DeleteByIdAsync(int id);
        Task AssignRoleAsync(int userId, int roleId);

        // Thêm phần login với JWT
        Task<string?> AuthenticateAsync(string username, string password);

        Task<bool> LogoutAsync(int userId);

    }


}