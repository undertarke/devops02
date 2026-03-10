namespace Hospital_API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public string? Token { get; set; }
        public DateTime? TokenExpired { get; set; }
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Address { get; set; } = null!;

        public string Phone { get; set; } = null!;
        public string Gender { get; set; } = null!;
        public DateTime DateOfBirth { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? ResetToken { get; set; }
        public DateTime? ResetTokenExpired { get; set; }
        public string? AvatarUrl { get; set; }

        public string? Status { get; set; }
        public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();

        public virtual Patient Patient { get; set; } = null!;

        public virtual Doctor Doctor { get; set; } = null!;

    }

}