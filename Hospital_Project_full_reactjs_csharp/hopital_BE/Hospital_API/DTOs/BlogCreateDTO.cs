using Microsoft.AspNetCore.Http;

namespace Hospital_API.DTOs
{
    public class BlogCreateDTO
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string Category { get; set; }
        public string? Excerpt { get; set; }
        public string Status { get; set; } = "Draft"; // Thêm trường Status với giá trị mặc định là Draft
        public IFormFile? FeaturedImage { get; set; }
    }
} 