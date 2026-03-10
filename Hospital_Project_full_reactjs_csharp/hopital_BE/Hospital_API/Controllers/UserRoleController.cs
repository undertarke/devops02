using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_API.Controllers
{
    [ApiController]
[Route("api/[controller]")]
public class UserRoleController : ControllerBase
{
    private readonly IUserRoleService _service;

    public UserRoleController(IUserRoleService service)
    {
        _service = service;
    }

    [HttpPost("assign")]
    public async Task<IActionResult> AssignRoles([FromBody] AssignRolesDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _service.AssignRolesAsync(dto);
        return result ? Ok("Roles assigned") : BadRequest("Assign failed");
    }

    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetRolesByUser(int userId)
    {
        var roles = await _service.GetRolesByUserIdAsync(userId);
        return Ok(roles);
    }

    [HttpDelete("{userId}/{roleId}")]
    public async Task<IActionResult> RemoveRole(int userId, int roleId)
    {
        var result = await _service.RemoveRoleAsync(userId, roleId);
        return result ? Ok("Role removed") : NotFound("UserRole not found");
    }
}

}