namespace Hospital_API.DTOs
{
    public class AppointmentCreateDTO
    {
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public int BranchId { get; set; }
        public DateTime AppointmentDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public string? Note { get; set; }
    }
}