using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hospital_API.Models
{
    public class BlogImage
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int BlogId { get; set; }

        [ForeignKey("BlogId")]
        public Blog Blog { get; set; }

        [Required]
        [StringLength(500)]
        public string ImageUrl { get; set; }

        public bool IsFeatured { get; set; } = false;

        [StringLength(200)]
        public string? Caption { get; set; }

        public int DisplayOrder { get; set; } = 0;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
} 