using Hospital_API.DTOs;

namespace Hospital_API.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDTO> LoginAsync(LoginDto request);
        Task<bool> RegisterAsync(RegisterRequestDTO dto);

        Task<bool> LogoutAsync(int userId);
        Task<string> GenerateResetTokenAsync(ForgotPasswordDTO dto);
        Task<bool> ChangePasswordAsync(int userId, ChangePasswordDTO dto);

        Task<bool> ResetPasswordAsync(ResetPasswordDTO dto);


    }

}