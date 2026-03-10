namespace Hospital_API.DTOs
{
    public class PaymentDTO
    {
        public int Id { get; set; }
        public int InvoiceId { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public string PaymentMethod { get; set; }
        public string? TransactionCode { get; set; }
    }

}