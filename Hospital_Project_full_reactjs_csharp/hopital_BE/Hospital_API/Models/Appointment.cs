namespace Hospital_API.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public int BranchId { get; set; }
        public string AppointmentNo { get; set; } = string.Empty;

        public DateTime AppointmentDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }

        public string Status { get; set; } = "Pending";
        public string? Note { get; set; }

        // Navigation
        public virtual Patient Patient { get; set; } = null!;
        public virtual Doctor Doctor { get; set; } = null!;
        public virtual Branch Branch { get; set; } = null!;
        public virtual Invoice? Invoice { get; set; }
    }

}