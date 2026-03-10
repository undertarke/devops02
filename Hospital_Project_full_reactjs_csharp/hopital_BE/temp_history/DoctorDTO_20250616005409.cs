namespace Hospital_API.DTOs
{
    public class DoctorDTO
    {
        public int Id { get; set; }
    public int UserId { get; set; }
    public string FullName { get; set; } = string.Empty; // Lấy từ User
    public string Specialization { get; set; } = string.Empty;
    public string Degree { get; set; } = string.Empty;
    public int YearOfExperience { get; set; }
    }
}