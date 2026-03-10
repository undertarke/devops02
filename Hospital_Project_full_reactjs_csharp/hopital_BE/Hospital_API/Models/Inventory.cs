using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hospital_API.Models
{
    public class Inventory
    {
        [Key]
        public int Id { get; set; }
        public int MedicineID { get; set; }

        [ForeignKey("MedicineID")]
        public Medicines Medicine { get; set; }

        public int Stock { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}