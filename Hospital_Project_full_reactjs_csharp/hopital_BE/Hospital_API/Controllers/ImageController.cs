using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using System;

namespace Hospital_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IWebHostEnvironment _environment;

        public ImageController(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        [HttpPost("upload")]
        [Authorize]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                    return BadRequest("Không có file được gửi lên");

                // Tạo thư mục uploads nếu chưa tồn tại
                var uploadsFolder = Path.Combine(_environment.WebRootPath, "uploads");
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                // Tạo tên file ngẫu nhiên để tránh trùng lặp
                var uniqueFileName = $"{Guid.NewGuid()}_{file.FileName}";
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                // Lưu file
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Trả về URL của hình ảnh
                var imageUrl = $"{Request.Scheme}://{Request.Host}/uploads/{uniqueFileName}";
                return Ok(new { location = imageUrl });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi khi upload hình ảnh: {ex.Message}");
            }
        }
    }
} 