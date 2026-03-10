using Microsoft.AspNetCore.Http;

namespace Hospital_API.DTOs
{
    public class ImageDTO
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public string FileType { get; set; }
        public long FileSize { get; set; }
        public DateTime UploadDate { get; set; }
        public string? Description { get; set; }
        public string? Module { get; set; }
        public int? ReferenceId { get; set; }
        public string? UploadedBy { get; set; }
        public bool IsActive { get; set; }
        public int? BlogId { get; set; }
        public int? DoctorId { get; set; }
        public int? UserId { get; set; }
    }

    public class ImageUploadRequest
    {
        public IFormFile File { get; set; }
        public string? Description { get; set; }
        public string? Module { get; set; }
        public int? ReferenceId { get; set; }
        public int? BlogId { get; set; }
        public int? DoctorId { get; set; }
        public int? UserId { get; set; }
    }

    public class ImageUploadResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public string ImageUrl { get; set; }
        public ImageDTO Image { get; set; }
    }
} 