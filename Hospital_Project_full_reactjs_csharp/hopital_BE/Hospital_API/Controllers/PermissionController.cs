using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_API.Controllers
{
    [ApiController]
[Route("api/[controller]")]
public class PermissionController : ControllerBase
{
    private readonly IPermissionService _permissionService;

    public PermissionController(IPermissionService permissionService)
    {
        _permissionService = permissionService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _permissionService.GetAllAsync();
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _permissionService.GetByIdAsync(id);
        if (result == null) return NotFound();
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create(PermissionCreateDto dto)
    {
         if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var success = await _permissionService.CreateAsync(dto);
        if (!success)
            return BadRequest("Create failed");
        return Ok("Created");
    }

    [HttpPut]
    public async Task<IActionResult> Update(int id, [FromBody] PermmissionUpdateDTO dto)
    {
       if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (id != dto.Id)   
            return BadRequest("Id mismatch");

        var success = await _permissionService.UpdateAsync(dto);
        if (!success)
            return NotFound("Permission not found");
        return Ok("Updated");
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _permissionService.DeleteAsync(id);
        return success ? Ok("Deleted") : NotFound("Permission not found");
    }
}

}