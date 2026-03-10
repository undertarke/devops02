using Hospital_API.Data;
using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Hospital_API.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Services
{
    public class ImageService : IImageService
    {
        private readonly HospitalDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ImageService(HospitalDbContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<ImageUploadResponse> UploadImage(
            IFormFile file,
            string? description = null,
            string? module = null,
            int? referenceId = null,
            int? blogId = null,
            int? doctorId = null,
            int? userId = null,
            string? uploadedBy = null)
        {
            if (file == null || file.Length == 0)
            {
                throw new ArgumentException("No file was uploaded.");
            }

            // Validate file type
            var allowedTypes = new[] { ".jpg", ".jpeg", ".png", ".gif" };
            var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
            if (!allowedTypes.Contains(fileExtension))
            {
                throw new ArgumentException("Invalid file type. Only jpg, jpeg, png, and gif are allowed.");
            }

            // Generate unique filename
            var fileName = $"{Guid.NewGuid()}{fileExtension}";
            var relativePath = Path.Combine("uploads", "images", fileName);
            var absolutePath = Path.Combine(_webHostEnvironment.WebRootPath, relativePath);

            // Ensure directory exists
            Directory.CreateDirectory(Path.GetDirectoryName(absolutePath));

            // Save file
            using (var stream = new FileStream(absolutePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Create image record
            var image = new Image
            {
                FileName = fileName,
                FilePath = relativePath,
                FileType = file.ContentType,
                FileSize = file.Length,
                Description = description,
                Module = module,
                ReferenceId = referenceId,
                BlogId = blogId,
                DoctorId = doctorId,
                UserId = userId,
                UploadedBy = uploadedBy,
                UploadDate = DateTime.UtcNow,
                IsActive = true
            };

            _context.Images.Add(image);
            await _context.SaveChangesAsync();

            return new ImageUploadResponse
            {
                Success = true,
                Message = "File uploaded successfully",
                ImageUrl = $"/{relativePath.Replace('\\', '/')}",
                Image = new ImageDTO
                {
                    Id = image.Id,
                    FileName = image.FileName,
                    FilePath = image.FilePath,
                    FileType = image.FileType,
                    FileSize = image.FileSize,
                    Description = image.Description,
                    Module = image.Module,
                    ReferenceId = image.ReferenceId,
                    BlogId = image.BlogId,
                    DoctorId = image.DoctorId,
                    UserId = image.UserId,
                    UploadedBy = image.UploadedBy,
                    UploadDate = image.UploadDate,
                    IsActive = image.IsActive
                }
            };
        }

        public async Task<Image> GetImageById(int id)
        {
            return await _context.Images.FindAsync(id);
        }

        public async Task<IEnumerable<Image>> GetImagesByModule(string module)
        {
            return await _context.Images
                .Where(i => i.Module == module && i.IsActive)
                .ToListAsync();
        }

        public async Task<IEnumerable<Image>> GetImagesByReference(string module, int referenceId)
        {
            return await _context.Images
                .Where(i => i.Module == module && i.ReferenceId == referenceId && i.IsActive)
                .ToListAsync();
        }

        public async Task<bool> DeleteImage(int id)
        {
            var image = await _context.Images.FindAsync(id);
            if (image == null)
                return false;

            // Soft delete
            image.IsActive = false;
            await _context.SaveChangesAsync();
            return true;
        }
    }
} 