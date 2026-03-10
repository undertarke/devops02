using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientController : ControllerBase
    {
        private readonly IPatientService _service;

        public PatientController(IPatientService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _service.GetByIdAsync(id);
            return result != null ? Ok(result) : NotFound();
        }
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUserId(int userId)
        {
            var patient = await _patientService.GetByUserIdAsync(userId);
            if (patient == null) return NotFound("Patient not found");

            return Ok(patient);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PatientCreateDTO dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var result = await _service.CreateAsync(dto);
            return result ? Ok("Created") : BadRequest("Failed");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] PatientUpdateDTO dto)
        {
            var result = await _service.UpdateAsync(id, dto);
            return result ? Ok("Updated") : NotFound("Not Found");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.DeleteAsync(id);
            return result ? Ok("Deleted") : NotFound("Not Found");
        }
    }

}