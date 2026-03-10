using System.Security.Claims;
using Hospital_API.DTOs;
using Hospital_API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointmentService _service;

        public AppointmentController(IAppointmentService service)
        {
            _service = service;
        }

        /// <summary>
        /// Get all appointments
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllAsync();
            return Ok(result);
        }

        /// <summary>
        /// Get appointment by ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var appointment = await _service.GetByIdAsync(id);
            if (appointment == null)
                return NotFound(new { message = $"Appointment with ID {id} not found." });

            return Ok(appointment);
        }
        [HttpGet("by-patient/{patientId}")]
        public async Task<IActionResult> GetByPatientId(int patientId)
        {
            var result = await _service.GetAppointmentsByPatientIdAsync(patientId);
            return Ok(result);
        }

        /// <summary>
        /// Create a new appointment
        /// </summary>
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] AppointmentCreateDTO dto)
        {

            if (!ModelState.IsValid)
                return BadRequest(new { message = "Account Admin không thể book lịch khám." });


            try
            {
                var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

                var result = await _service.CreateAsync(dto, userId);
                return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", detail = ex.Message });
            }
        }

        /// <summary>
        /// Confirm an appointment
        /// </summary>
        [HttpPut("{id}/confirm")]
        public async Task<IActionResult> Confirm(int id)
        {
            var success = await _service.ConfirmAsync(id);
            if (!success)
                return NotFound(new { message = $"Appointment with ID {id} not found." });

            return Ok(new { message = "Appointment confirmed successfully." });
        }

        /// <summary>
        /// Cancel an appointment
        /// </summary>
        [HttpPut("cancel/{id}")]

        public async Task<IActionResult> Cancel(int id)
        {
            var success = await _service.CancelAsync(id);
            if (!success)
                return NotFound(new { message = $"Appointment with ID {id} not found." });

            return Ok(new { message = "Appointment cancelled successfully." });
        }

        /// <summary>
        /// Get appointments by doctor and date
        /// </summary>
        [HttpGet("by-doctor")]
        public async Task<IActionResult> GetByDoctorAndDate([FromQuery] int doctorId, [FromQuery] DateTime date)
        {
            var list = await _service.GetByDoctorAndDateAsync(doctorId, date);
            return Ok(list);
        }

        /// <summary>
        /// Get available time slots for doctor
        /// </summary>
        [HttpGet("available-times")]
        public async Task<IActionResult> GetAvailableTimes([FromQuery] int doctorId, [FromQuery] DateTime date)
        {
            var slots = await _service.GetAvailableTimeSlotsAsync(doctorId, date);
            return Ok(slots);
        }
    }
}
