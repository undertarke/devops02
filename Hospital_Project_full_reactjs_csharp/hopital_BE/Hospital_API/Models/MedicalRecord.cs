using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hospital_API.Models
{
    public class MedicalRecord
    {
        [Key]
        public int Id { get; set; }

        public int AppointmentID { get; set; }

        [ForeignKey("AppointmentID")]
        public Appointment Appointment { get; set; }

        public string Diagnosis { get; set; }
        public string Conclusion { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}