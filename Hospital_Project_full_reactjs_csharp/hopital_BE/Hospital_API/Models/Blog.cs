using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Hospital_API.Models
{
    public class Blog
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string? FeaturedImage { get; set; }
        public string Category { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public int AuthorId { get; set; }
        public User Author { get; set; }
        public string? Excerpt { get; set; }
        public string Slug { get; set; }
    }
} 