namespace Hospital_API.DTOs
{
    public class InvoiceDTO
    {
        public int Id { get; set; }
        public int AppointmentId { get; set; }
            public int PatientId { get; set; }

        public DateTime IssuedDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; }
        public string? Note { get; set; }
        public DateTime CreatedAt { get; set; }

    }

}
