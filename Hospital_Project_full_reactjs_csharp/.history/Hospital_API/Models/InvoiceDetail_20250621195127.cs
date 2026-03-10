namespace Hospital_API.Models
{
    public class InvoiceDetail
{
    public int Id { get; set; }

    public int InvoiceId { get; set; }
    public Invoice Invoice { get; set; } = null!;

    // Liên kết thuốc (nếu có)
    public int? MedicineId { get; set; }
    public Medicines? Medicine { get; set; }

    // Liên kết dịch vụ (nếu có)
    public int? ServiceId { get; set; }
    public MedicalServiceDb? MedicalService { get; set; }

    public string Description { get; set; } = string.Empty;

    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice { get; set; }
}

}