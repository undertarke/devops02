namespace Hospital_API.Controllers
{
    [ApiController]
[Route("api/[controller]")]
public class ReportsController : ControllerBase
{
    private readonly HospitalDbContext _context;

    public ReportsController(HospitalDbContext context)
    {
        _context = context;
    }

    [HttpGet("revenue")]
    public async Task<IActionResult> GetRevenueReport([FromQuery] DateTime from, [FromQuery] DateTime to, [FromQuery] int? branchId)
    {
        if (from > to)
            return BadRequest(new { message = "From date must be before To date." });

        // Filter theo branch nếu có
        var appointmentsQuery = _context.Appointments
            .Where(a => a.CreatedAt >= from && a.CreatedAt <= to);

        var invoicesQuery = _context.Invoices
            .Include(i => i.Appointment)
            .Where(i => i.IssuedDate >= from && i.IssuedDate <= to);

        var paymentsQuery = _context.Payments
            .Where(p => p.PaymentDate >= from && p.PaymentDate <= to);

        if (branchId.HasValue)
        {
            appointmentsQuery = appointmentsQuery.Where(a => a.BranchId == branchId);
            invoicesQuery = invoicesQuery.Where(i => i.Appointment.BranchId == branchId);
        }

        var totalAppointments = await appointmentsQuery.CountAsync();
        var totalInvoices = await invoicesQuery.CountAsync();
        var paidInvoices = await invoicesQuery.Where(i => i.Status == "Paid").CountAsync();
        var totalRevenue = await paymentsQuery.SumAsync(p => (decimal?)p.Amount) ?? 0;

        var result = new
        {
            FromDate = from,
            ToDate = to,
            BranchId = branchId,
            TotalAppointments = totalAppointments,
            TotalInvoices = totalInvoices,
            PaidInvoices = paidInvoices,
            TotalRevenue = totalRevenue
        };

        return Ok(result);
    }
}

}