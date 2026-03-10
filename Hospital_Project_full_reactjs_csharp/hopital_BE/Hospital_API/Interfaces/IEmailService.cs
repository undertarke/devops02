using Hospital_API.DTOs;

namespace Hospital_API.Interfaces
{
    public interface IEmailService
    {
        Task<bool> SendEmailAsync(EmailDTO emailDto);
    }
}