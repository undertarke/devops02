using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_API.Controllers
{
    [ApiController]
[Route("api/[controller]")]
public class InvoiceDetailController : ControllerBase
{
    private readonly IInvoiceDetailService _service;

    public InvoiceDetailController(IInvoiceDetailService service)
    {
        _service = service;
    }

    /// <summary>
    /// Lấy tất cả các dòng chi tiết hóa đơn
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var data = await _service.GetAllAsync();
        return Ok(data);
    }

    /// <summary>
    /// Lấy chi tiết hóa đơn theo ID
    /// </summary>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var detail = await _service.GetByIdAsync(id);
        if (detail == null)
            return NotFound(new { message = $"InvoiceDetail with ID {id} not found" });

        return Ok(detail);
    }

    /// <summary>
    /// Lấy tất cả dòng chi tiết theo ID hóa đơn cha
    /// </summary>
    [HttpGet("invoice/{invoiceId}")]
    public async Task<IActionResult> GetByInvoiceId(int invoiceId)
    {
        var data = await _service.GetByInvoiceIdAsync(invoiceId);
        return Ok(data);
    }

    /// <summary>
    /// Tạo mới dòng chi tiết hóa đơn
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] InvoiceDetailCreateDTO dto)
    {
        // Kiểm tra dữ liệu đầu vào
        if (dto == null)
            return BadRequest(new { message = "Invalid data" });

        if (string.IsNullOrWhiteSpace(dto.ItemType) || dto.ItemId <= 0)
            return BadRequest(new { message = "ItemType and ItemId are required" });

        if (dto.Quantity <= 0)
            return BadRequest(new { message = "Quantity must be greater than zero" });

        if (dto.UnitPrice < 0)
            return BadRequest(new { message = "UnitPrice must not be negative" });

        // Kiểm tra loại ItemType có hợp lệ không
        var validTypes = new[] { "Medicine", "Service" };
        if (!validTypes.Contains(dto.ItemType))
            return BadRequest(new { message = $"ItemType must be one of: {string.Join(", ", validTypes)}" });

        try
        {
            var created = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while creating the invoice detail", detail = ex.Message });
        }
    }

    /// <summary>
    /// Xóa dòng chi tiết hóa đơn
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _service.DeleteAsync(id);
        if (!success)
            return NotFound(new { message = $"InvoiceDetail with ID {id} not found" });

        return NoContent();
    }
}

}