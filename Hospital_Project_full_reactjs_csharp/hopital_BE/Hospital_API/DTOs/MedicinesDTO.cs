
namespace Hospital_API.DTOs
{
    public class MedicinesDTO
    {

        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string SupplierName { get; set; }
        public bool IsExpired { get; set; }
    }
    public class MedicinesCreateDTO
    {
        public string Code { get; set; }

        public string Name { get; set; }

        public string Type { get; set; }

        public DateTime ExpiryDate { get; set; }

        public int SupplierId { get; set; }
    }
}
