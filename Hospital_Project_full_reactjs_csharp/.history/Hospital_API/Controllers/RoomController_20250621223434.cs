using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_API.Controllers
{
    [ApiController]
[Route("api/[controller]")]
public class RoomController : ControllerBase
{
    private readonly IRoomService _service;

    public RoomController(IRoomService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var rooms = await _service.GetAllAsync();
        return Ok(rooms);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var room = await _service.GetByIdAsync(id);
        if (room == null) return NotFound(new { message = $"Room ID {id} not found" });
        return Ok(room);
    }

    [HttpPost]
    public async Task<IActionResult> Create(RoomCreateDTO dto)
    {
        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, RoomCreateDTO dto)
    {
        var updated = await _service.UpdateAsync(id, dto);
        if (updated == null) return NotFound(new { message = $"Room ID {id} not found" });
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteAsync(id);
        if (!deleted) return NotFound(new { message = $"Room ID {id} not found" });
        return NoContent();
    }
}

}