namespace Hospital_API.DTOs
{
    public class UserResponse
    {
        public int Id { get; set; }
        public string Username { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Address { get; set; } = null!;

        public string Phone { get; set; } = null!;
        public string Gender { get; set; } = null!;
        public string? AvatarUrl { get; set; } = null!;
        public string? Status { get; set; } = null!;

        public DateTime DateOfBirth { get; set; }
        public DateTime CreatedAt { get; set; }

        public List<string> Roles { get; set; } = new();
    }

}