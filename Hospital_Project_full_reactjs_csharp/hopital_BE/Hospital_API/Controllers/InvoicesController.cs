using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InvoicesController : ControllerBase
    {
        private readonly IInvoiceService _service;

        public InvoicesController(IInvoiceService service)
        {
            _service = service;
        }

        /// <summary>
        /// Lấy toàn bộ hóa đơn
        /// </summary>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<InvoiceDTO>), 200)]
        public async Task<ActionResult<IEnumerable<InvoiceDTO>>> GetAll()
        {
            var result = await _service.GetAllAsync();
            return Ok(result);
        }

        /// <summary>
        /// Lấy hóa đơn theo ID
        /// </summary>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(InvoiceDTO), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<InvoiceDTO>> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            if (result == null)
                return NotFound(new { message = $"Invoice with ID {id} not found." });

            return Ok(result);
        }
        [HttpGet("by-patient/{patientId}")]
        public async Task<ActionResult<List<InvoiceDTO>>> GetInvoicesByPatientId(int patientId)
        {
            var result = await _service.GetInvoicesByPatientIdAsync(patientId);

            if (result == null)
                return Ok(new List<InvoiceDTO>());

            return Ok(result);
        }
        /// <summary>
        /// Lấy hóa đơn theo lịch hẹn
        /// </summary>
        [HttpGet("by-appointment/{appointmentId}")]
        [ProducesResponseType(typeof(InvoiceDTO), 200)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<InvoiceDTO>> GetByAppointmentId(int appointmentId)
        {
            var result = await _service.GetByAppointmentIdAsync(appointmentId);
            if (result == null)
                return NotFound(new { message = $"No invoice found for appointment ID {appointmentId}." });

            return Ok(result);
        }

        /// <summary>
        /// Tạo mới hóa đơn
        /// </summary>
        [HttpPost]
        [ProducesResponseType(typeof(InvoiceDTO), 201)]
        [ProducesResponseType(400)]
        public async Task<ActionResult<InvoiceDTO>> Create([FromBody] InvoiceCreateDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        /// <summary>
        /// Cập nhật hóa đơn
        /// </summary>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(InvoiceDTO), 200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<InvoiceDTO>> Update(int id, [FromBody] InvoiceUpdateDTO dto)
        {
            if (id != dto.Id)
                return BadRequest(new { message = "ID mismatch." });

            var result = await _service.UpdateAsync(dto);
            if (result == null)
                return NotFound(new { message = $"Invoice with ID {id} not found." });

            return Ok(result);
        }

        /// <summary>
        /// Xoá hóa đơn
        /// </summary>
        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _service.DeleteAsync(id);
            if (!success)
                return NotFound(new { message = $"Invoice with ID {id} not found." });

            return NoContent();
        }

        [HttpPost("createdetails")]
        public async Task<IActionResult> CreateWithDetails([FromBody] InvoiceCreateDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var invoiceId = await _service.CreateWithDetailsAsync(dto);
                return Ok(new { invoiceId });
            }
            catch (DbUpdateException dbEx)
            {
                return StatusCode(500, new { message = "Lỗi database khi tạo hóa đơn.", detail = dbEx.InnerException?.Message ?? dbEx.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Đã xảy ra lỗi trong quá trình tạo hóa đơn.", detail = ex.Message });
            }
        }
    }
}
