namespace Hospital_API.Models
{
    public class Patient
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string InsuranceCode { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string EmergencyContact { get; set; } = string.Empty;

        public virtual User User { get; set; } = null!;

        public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();

    }
}