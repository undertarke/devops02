using Microsoft.AspNetCore.Http;

namespace Hospital_API.DTOs
{
    public class BlogUpdateDTO
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }
        public string? Excerpt { get; set; }
        public IFormFile? FeaturedImage { get; set; }
    }
} 