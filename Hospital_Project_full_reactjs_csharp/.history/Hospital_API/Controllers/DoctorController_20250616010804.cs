using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_API.Controllers
{
    [Route("api/[controller]")]
[ApiController]
public class DoctorController : ControllerBase
{
    private readonly IDoctorService _service;

    public DoctorController(IDoctorService service)
    {
        _service = service;
    }

    // GET: api/Doctor
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var doctors = await _service.GetAllAsync();
        return Ok(doctors);
    }

    // GET: api/Doctor/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        if (id <= 0) return BadRequest("Invalid doctor ID.");

        var doctor = await _service.GetByIdAsync(id);
        if (doctor == null)
            return NotFound(new { Message = $"Doctor with ID {id} not found." });

        return Ok(doctor);
    }

    // GET: api/Doctor/user/3
    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetByUserId(int userId)
    {
        if (userId <= 0) return BadRequest("Invalid user ID.");

        var doctor = await _service.GetByUserIdAsync(userId);
        if (doctor == null)
            return NotFound(new { Message = $"Doctor with User ID {userId} not found." });

        return Ok(doctor);
    }

    // POST: api/Doctor
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] DoctorCreateDTO dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var result = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = "Failed to create doctor.", Error = ex.Message });
        }
    }

    // PUT: api/Doctor/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] DoctorUpdateDTO dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (id != dto.Id)
            return BadRequest(new { Message = "ID mismatch between route and body." });

        var existingDoctor = await _service.GetByIdAsync(id);
        if (existingDoctor == null)
            return NotFound(new { Message = $"Doctor with ID {id} not found." });

        var result = await _service.UpdateAsync(dto);
        return Ok(result);
    }

    // DELETE: api/Doctor/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        if (id <= 0) return BadRequest("Invalid ID.");

        var existingDoctor = await _service.GetByIdAsync(id);
        if (existingDoctor == null)
            return NotFound(new { Message = $"Doctor with ID {id} not found." });

        var success = await _service.DeleteAsync(id);
        if (!success)
            return StatusCode(500, new { Message = "Failed to delete doctor." });

        return NoContent();
    }
}


}