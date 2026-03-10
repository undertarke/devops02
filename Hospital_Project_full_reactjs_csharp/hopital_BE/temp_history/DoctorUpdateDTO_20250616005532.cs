namespace Hospital_API.DTOs
{
    public class DoctorUpdateDTO
    {
        public int Id { get; set; }
        public string Specialization { get; set; } = string.Empty;
        public string Degree { get; set; } = string.Empty;
        public int YearOfExperience { get; set; }
    }
}