namespace Hospital_API.DTOs
{
    public class InvoiceDetailCreateDTO
{
    public int InvoiceId { get; set; }
    public string ItemType { get; set; } = string.Empty; // "Medicine" hoặc "Service"
    public int ItemId { get; set; }

    public string? Description { get; set; } // optional
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
}

}