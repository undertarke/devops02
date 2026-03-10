namespace Hospital_API.DTOs
{
    public class InvoiceUpdateDTO
    {
        public int Id { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; }
        public string? Notes { get; set; }
    }
}
