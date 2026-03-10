namespace Hospital_API.DTOs
{
    public class InventoryDTO
    {
        public int Id { get; set; }
        public int MedicineID { get; set; }
        public int Stock { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}