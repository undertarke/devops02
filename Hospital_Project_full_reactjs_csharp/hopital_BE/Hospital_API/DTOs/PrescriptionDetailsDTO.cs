namespace Hospital_API.DTOs
{
    public class PrescriptionDetailsDTO
    {
        public int Id { get; set; }
        public int PrescriptionID { get; set; }
        public int MedicineID { get; set; }
        public string Dosage { get; set; }
        public double Quantity { get; set; }
        public string Instructions { get; set; }
    }
}