namespace Hospital_API.DTOs
{
    public class PatientCreateDTO
    {
        public int UserId { get; set; }
        public string InsuranceCode { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string EmergencyContact { get; set; } = string.Empty;
    }
}