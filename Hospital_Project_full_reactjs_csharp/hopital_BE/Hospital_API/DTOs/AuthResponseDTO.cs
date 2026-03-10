namespace Hospital_API.DTOs
{
    public class AuthResponseDTO
    {
        public string Token { get; set; } = null!;
        public DateTime ExpiredAt { get; set; }

        public int UserId { get; set; }
        public string Username { get; set; } = null!;
        public string FullName { get; set; } = null!;
        
        public List<string> Roles { get; set; } = new();
    }

}