using System.ComponentModel.DataAnnotations;

namespace Hospital_API.Models
{
    public class Branch
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }

        public virtual ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
        public ICollection<Doctor> Doctors { get; set; } = new List<Doctor>();

    }
}