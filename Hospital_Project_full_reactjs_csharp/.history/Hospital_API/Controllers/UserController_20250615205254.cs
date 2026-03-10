using System.Security.Claims;
using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<List<UserResponse>>> GetAll()
        {
            var users = await _userService.GetAllAsync();
            return Ok(users);
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        [Authorize]

        public async Task<ActionResult<UserResponse>> GetById(int id)
        {
            var user = await _userService.GetByIdAsync(id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        // POST: api/User
        [HttpPost]
        [AllowAnonymous] // Cho phép đăng ký user mới
        public async Task<ActionResult<UserResponse>> Create(UserCreateDto dto)
        {
            try
            {
                var createdUser = await _userService.CreateAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id = createdUser.Id }, createdUser);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Update(int id, UserUpdateDto dto)
        {
            try
            {
                var updated = await _userService.UpdateAsync(id, dto);
                if (!updated) return NotFound();

                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")] // Chỉ Admin được phép xóa user
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _userService.DeleteByIdAsync(id);
            if (!deleted) return NotFound();

            return NoContent();
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid request");

            var token = await _userService.AuthenticateAsync(dto.Username, dto.Password);
            if (token == null)
                return Unauthorized("Invalid username or password");

            return Ok(new
            {
                Token = token,
                Message = "Login successful"
            });
        }
        [Authorize]
        [HttpPost("logout")]

        public async Task<IActionResult> Logout()
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!int.TryParse(userIdStr, out int userId)) return Unauthorized();

            var success = await _userService.LogoutAsync(userId);
            if (!success) return Unauthorized();

            return Ok(new { message = "Đăng xuất thành công" });
        }


        [HttpGet("test")]
        public IActionResult TestRole()
        {
            var roles = User.Claims.Where(c => c.Type == ClaimTypes.Role).Select(c => c.Value).ToList();
            return Ok(new { roles });
        }
    }
}