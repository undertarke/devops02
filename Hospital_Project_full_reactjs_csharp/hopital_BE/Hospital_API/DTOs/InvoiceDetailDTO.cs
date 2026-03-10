namespace Hospital_API.DTOs
{
    public class InvoiceDetailDTO
    {
        public int Id { get; set; }
        public int InvoiceId { get; set; }

        public string ItemType { get; set; } = string.Empty;
        public int ItemId { get; set; }

        public string Description { get; set; } = string.Empty;

        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
    }

}