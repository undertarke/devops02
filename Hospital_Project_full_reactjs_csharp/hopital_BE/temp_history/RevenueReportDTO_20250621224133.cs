namespace Hospital_API.DTOs
{
    public class RevenueReportDTO
{
    public int Id { get; set; }

    public DateTime FromDate { get; set; }
    public DateTime ToDate { get; set; }

    public int BranchId { get; set; }
    public string? BranchName { get; set; }

    public int TotalAppointments { get; set; }
    public int TotalInvoices { get; set; }
    public int PaidInvoices { get; set; }
    public decimal TotalRevenue { get; set; }

    public string? Note { get; set; }
}

}