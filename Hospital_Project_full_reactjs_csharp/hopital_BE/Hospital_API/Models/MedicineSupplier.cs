
using System.ComponentModel.DataAnnotations;

namespace Hospital_API.Models
{
    public class MedicineSupplier
    {
        [Key]
        public int SupplierId { get; set; }


        [Required]
        public string SupplierName { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }
    }
}
