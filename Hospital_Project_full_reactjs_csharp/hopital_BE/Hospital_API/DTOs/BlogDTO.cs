using System;
using System.Collections.Generic;

namespace Hospital_API.DTOs
{
    public class BlogDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string? FeaturedImage { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public int AuthorId { get; set; }
        public string AuthorName { get; set; }
        public string? Excerpt { get; set; }
        public string Slug { get; set; }
    }

    public class BlogImageDTO
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public bool IsFeatured { get; set; }
        public string? Caption { get; set; }
        public int DisplayOrder { get; set; }
    }
} 