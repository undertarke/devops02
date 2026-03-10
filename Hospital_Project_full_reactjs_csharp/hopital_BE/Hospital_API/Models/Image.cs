using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hospital_API.Models
{
    public class Image
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string FileName { get; set; }
        
        [Required]
        public string FilePath { get; set; }
        
        [Required]
        public string FileType { get; set; }
        
        public long FileSize { get; set; }
        
        public DateTime UploadDate { get; set; } = DateTime.Now;
        
        public string? Description { get; set; }

        // Thêm các trường để liên kết
        public string? Module { get; set; } // Ví dụ: "Blog", "Doctor", "Patient"
        public int? ReferenceId { get; set; } // ID của bản ghi trong module tương ứng
        public string? UploadedBy { get; set; } // Username của người upload
        public bool IsActive { get; set; } = true;

        // Liên kết với Blog
        public int? BlogId { get; set; }
        [ForeignKey("BlogId")]
        public Blog? Blog { get; set; }

        // Liên kết với Doctor (ví dụ: ảnh đại diện)
        public int? DoctorId { get; set; }
        [ForeignKey("DoctorId")]
        public Doctor? Doctor { get; set; }

        // Liên kết với User (ví dụ: avatar)
        public int? UserId { get; set; }
        [ForeignKey("UserId")]
        public User? User { get; set; }
    }
} 