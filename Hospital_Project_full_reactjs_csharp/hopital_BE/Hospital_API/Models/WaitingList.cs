using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hospital_API.Models
{
    public class WaitingList
    {
        [Key]
        public int Id { get; set; }

        public int AppointmentID { get; set; }
        [ForeignKey("AppointmentID")]
        public Appointment Appointment { get; set; }

        public int QueueNumber { get; set; }
        public string Status { get; set; }
    }
}