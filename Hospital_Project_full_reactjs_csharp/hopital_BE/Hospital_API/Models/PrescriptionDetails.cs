using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hospital_API.Models
{
    public class PrescriptionDetails
    {
        [Key]
        public int Id { get; set; }

        public int PrescriptionID { get; set; }
        [ForeignKey("PrescriptionID")]
        public Prescriptions Prescription { get; set; }

        public int MedicineID { get; set; }
        [ForeignKey("MedicineID")]
        public Medicines Medicine { get; set; }

        public string Dosage { get; set; }
        public double Quantity { get; set; }
        public string Instructions { get; set; }
    }
}