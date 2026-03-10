namespace Hospital_API.DTOs
{
    public class ResetPasswordDTO
    {
        public string Token { get; set; } = null!;
        public string NewPassword { get; set; } = null!;
    }

}