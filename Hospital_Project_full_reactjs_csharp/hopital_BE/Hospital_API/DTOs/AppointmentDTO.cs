namespace Hospital_API.DTOs
{
    public class AppointmentDTO
    {
        public int Id { get; set; }

        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public int BranchId { get; set; }

        public string AppointmentNo { get; set; }

        public string PatientName { get; set; } = null!;
        public string DoctorName { get; set; } = null!;
        public string BranchName { get; set; } = null!;

        public string? Specialization { get; set; }

        public DateTime AppointmentDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }

        public string Status { get; set; } = null!;
        public string? Note { get; set; }
    }

}