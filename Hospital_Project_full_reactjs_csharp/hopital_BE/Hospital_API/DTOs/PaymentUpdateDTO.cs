namespace Hospital_API.DTOs
{
    public class PaymentUpdateDTO
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public string PaymentMethod { get; set; }
        public string? TransactionCode { get; set; }
    }

}