namespace Hospital_API.Models
{
    public class RevenueReport
{
    public int Id { get; set; }

    public DateTime FromDate { get; set; }
    public DateTime ToDate { get; set; }

    public int BranchId { get; set; }
    public Branch Branch { get; set; } = null!;

    public int TotalAppointments { get; set; }
    public int TotalInvoices { get; set; }
    public int PaidInvoices { get; set; }
    public decimal TotalRevenue { get; set; }

    public string? Note { get; set; }
}

}