namespace Hospital_API.Models
{
    public class InvoiceDetail
{
    public int Id { get; set; }

    public int InvoiceId { get; set; }
    public Invoice Invoice { get; set; } = null!;

    public string ItemType { get; set; } = string.Empty; // "Medicine" hoặc "Service"
    public int ItemId { get; set; }
    public string Description { get; set; } = string.Empty;

    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice { get; set; }
}

}