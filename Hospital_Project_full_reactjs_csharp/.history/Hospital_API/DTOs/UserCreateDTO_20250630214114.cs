namespace Hospital_API.DTOs
{
    public class UserCreateDto
    {
        public string Username { get; set; } = null!;
        public string Password { get; set; } = null!;  // Plain password, sẽ hash ở Service
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Gender { get; set; } = null!;
        public string? AvatarUrl { get; set; } = null!;
        public DateTime DateOfBirth { get; set; }
    }

}