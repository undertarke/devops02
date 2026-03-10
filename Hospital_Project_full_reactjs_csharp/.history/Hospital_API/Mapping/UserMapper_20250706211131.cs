using Hospital_API.DTOs;
using Hospital_API.Models;

namespace Hospital_API.Mapping{
    public static class UserMapper
{
    public static UserResponse ToDto(User user)
    {
        return new UserResponse
        {
            Id = user.Id,
            Username = user.Username,
            FullName = user.FullName,
            Email = user.Email,
            Phone = user.Phone,
            Gender = user.Gender,
            DateOfBirth = user.DateOfBirth,
            CreatedAt = user.CreatedAt,
            Status = user.Status,
            AvatarUrl = user.AvatarUrl,
            Roles = user.UserRoles?.Select(ur => ur.Role.Name).ToList() ?? new()
        };
    }

    public static User ToEntity(UserCreateDto dto)
    {
        return new User
        {
            Username = dto.Username,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            FullName = dto.FullName,
            Email = dto.Email,
            Phone = dto.Phone,
            Gender = dto.Gender,
            Status = dto.Status,
            AvatarUrl = dto.AvatarUrl,
            DateOfBirth = dto.DateOfBirth,
            CreatedAt = DateTime.UtcNow
        };
    }

    public static void UpdateEntity(User user, UserUpdateDto dto)
    {
        user.FullName = dto.FullName;
        user.Email = dto.Email;
        user.Phone = dto.Phone;
        user.Gender = dto.Gender;
        user.Status= dto.Status;
        user.AvatarUrl = dto.AvatarUrl;
        user.DateOfBirth = dto.DateOfBirth;
    }
}

}