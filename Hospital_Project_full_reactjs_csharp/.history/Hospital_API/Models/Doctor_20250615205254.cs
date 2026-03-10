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

        public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    }
}