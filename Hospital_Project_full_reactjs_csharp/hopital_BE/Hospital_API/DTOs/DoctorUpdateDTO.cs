namespace Hospital_API.DTOs
{
    public class DoctorUpdateDTO
{
    public int Id { get; set; }

    // User info
    public string FullName { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Gender { get; set; } = string.Empty;
    public DateTime DateOfBirth { get; set; }

    // Doctor info
    public string Specialization { get; set; } = string.Empty;
    public string Degree { get; set; } = string.Empty;
    public int YearOfExperience { get; set; }
    public string Status { get; set; } = string.Empty;
}

}