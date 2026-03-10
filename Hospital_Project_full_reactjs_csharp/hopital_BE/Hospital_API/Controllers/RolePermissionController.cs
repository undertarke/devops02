using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolePermissionController : ControllerBase
    {
        private readonly IRolePermissionService _service;

        public RolePermissionController(IRolePermissionService service)
        {
            _service = service;
        }

        /// <summary>
        /// Gán nhiều quyền cho 1 role
        /// </summary>
        [HttpPost("assign")]
        public async Task<IActionResult> AssignPermissions([FromBody] AssignPermissionsDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _service.AssignPermissionsAsync(dto);
            return result ? Ok("Permissions assigned") : BadRequest("Assign failed");
        }

        /// <summary>
        /// Lấy danh sách quyền theo RoleId
        /// </summary>
        [HttpGet("role/{roleId}")]
        public async Task<IActionResult> GetPermissionsByRole(int roleId)
        {
            var permissions = await _service.GetPermissionsByRoleIdAsync(roleId);
            return Ok(permissions);
        }

        /// <summary>
        /// Xoá 1 quyền khỏi role
        /// </summary>
        [HttpDelete("{roleId}/{permissionId}")]
        public async Task<IActionResult> RemovePermission(int roleId, int permissionId)
        {
            var result = await _service.RemovePermissionAsync(roleId, permissionId);
            return result ? Ok("Permission removed") : NotFound("RolePermission not found");
        }
    }

}