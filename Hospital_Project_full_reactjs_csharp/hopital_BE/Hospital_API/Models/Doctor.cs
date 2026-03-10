namespace Hospital_API.Models
{
    public class Doctor
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string Specialization { get; set; } = string.Empty;
        public string Degree { get; set; } = string.Empty;
        public int YearOfExperience { get; set; }

        public virtual User User { get; set; } = null!;

        public int BranchId { get; set; }  // Thêm dòng này
        public Branch Branch { get; set; } = null!;  // Navigation property
        public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
        public ICollection<DoctorSchedule> Schedules { get; set; } = new List<DoctorSchedule>();

    }
}