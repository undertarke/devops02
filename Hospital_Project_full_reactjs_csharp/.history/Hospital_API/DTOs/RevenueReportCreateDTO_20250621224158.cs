namespace Hospital_API.DTOs
{
    public class RevenueReportCreateDTO
{
    public DateTime FromDate { get; set; }
    public DateTime ToDate { get; set; }

    public int BranchId { get; set; }
    public string? Note { get; set; }
}

}