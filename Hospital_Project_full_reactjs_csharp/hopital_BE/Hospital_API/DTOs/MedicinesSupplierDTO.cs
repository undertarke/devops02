
namespace Hospital_API.DTOs
{
    public class MedicineSupplierDTO
    {
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }

    }
    public class MedicineSupplierCreateDTO
    {
        public string SupplierName { get; set; }


        public string Phone { get; set; }

        public string Address { get; set; }
    }
}
