using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hospital_API.Models
{
    public class Medicines
    {
        [Key]
        public int Id { get; set; }


        public string Code { get; set; }

        public string Name { get; set; }

        public string Type { get; set; }

        public DateTime ExpiryDate { get; set; }

        public int SupplierId { get; set; }

        [ForeignKey("SupplierId")]
        public MedicineSupplier Supplier { get; set; }

        [NotMapped]
        public bool IsExpired => DateTime.Now > ExpiryDate;
    }
}
