namespace Hospital_API.DTOs
{

    public class PatientResponse
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Phone { get; set; } = null!;
        public string Gender { get; set; } = null!;
        public string? AvatarUrl { get; set; } = null!;
        public string? Status { get; set; } = null!;

        public DateTime DateOfBirth { get; set; }

        public string InsuranceCode { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string EmergencyContact { get; set; } = string.Empty;
    }
}