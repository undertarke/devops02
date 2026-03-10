using Hospital_API.DTOs;
using Hospital_API.Models;
using Hospital_API.Interfaces;
using AutoMapper;

namespace Hospital_API.Services
{
    public class BlogService : IBlogService
    {
        private readonly IBlogRepository _blogRepository;
        private readonly IImageService _imageService;
        private readonly IMapper _mapper;

        public BlogService(IBlogRepository blogRepository, IImageService imageService, IMapper mapper)
        {
            _blogRepository = blogRepository;
            _imageService = imageService;
            _mapper = mapper;
        }

        public async Task<IEnumerable<BlogDTO>> GetAllAsync()
        {
            var blogs = await _blogRepository.GetAllAsync();
            // Chỉ trả về các blog đã publish
            return blogs.Where(b => b.Status.ToLower() == "published").Select(MapToDTO);
        }

        public async Task<IEnumerable<BlogDTO>> GetAllForAdminAsync()
        {
            var blogs = await _blogRepository.GetAllAsync();
            // Trả về tất cả blog cho admin
            return blogs.Select(MapToDTO);
        }

        public async Task<BlogDTO?> GetByIdAsync(int id)
        {
            var blog = await _blogRepository.GetByIdAsync(id);
            return blog == null ? null : MapToDTO(blog);
        }

        public async Task<BlogDTO> CreateAsync(BlogCreateDTO blogCreateDto)
        {
            var blog = new Blog
            {
                Title = blogCreateDto.Title,
                Content = blogCreateDto.Content,
                Category = blogCreateDto.Category,
                Status = blogCreateDto.Status, // Sử dụng status từ DTO thay vì hardcode
                CreatedAt = DateTime.UtcNow,
                AuthorId = 1, // Tạm thời hardcode, sau này sẽ lấy từ user đang đăng nhập
                Excerpt = blogCreateDto.Excerpt,
                Slug = GenerateSlug(blogCreateDto.Title)
            };

            // Xử lý featured image nếu có
            if (blogCreateDto.FeaturedImage != null)
            {
                var imageResult = await _imageService.UploadImage(blogCreateDto.FeaturedImage, $"Featured image for {blog.Title}", "Blog");
                if (imageResult.Success)
                {
                    blog.FeaturedImage = imageResult.ImageUrl;
                }
            }

            var createdBlog = await _blogRepository.CreateAsync(blog);
            return MapToDTO(createdBlog);
        }

        public async Task<BlogDTO?> UpdateAsync(int id, BlogUpdateDTO blogUpdateDto)
        {
            var existingBlog = await _blogRepository.GetByIdAsync(id);
            if (existingBlog == null)
                return null;

            existingBlog.Title = blogUpdateDto.Title;
            existingBlog.Content = blogUpdateDto.Content;
            existingBlog.Category = blogUpdateDto.Category;
            existingBlog.Status = blogUpdateDto.Status;
            existingBlog.UpdatedAt = DateTime.UtcNow;
            existingBlog.Excerpt = blogUpdateDto.Excerpt;

            // Xử lý featured image mới nếu có
            if (blogUpdateDto.FeaturedImage != null)
            {
                var imageResult = await _imageService.UploadImage(blogUpdateDto.FeaturedImage, $"Featured image for {existingBlog.Title}", "Blog");
                if (imageResult.Success)
                {
                    // Xóa featured image cũ nếu có
                    if (!string.IsNullOrEmpty(existingBlog.FeaturedImage))
                    {
                        var oldImageId = GetImageIdFromUrl(existingBlog.FeaturedImage);
                        if (oldImageId.HasValue)
                        {
                            await _imageService.DeleteImage(oldImageId.Value);
                        }
                    }
                    existingBlog.FeaturedImage = imageResult.ImageUrl;
                }
            }

            var updatedBlog = await _blogRepository.UpdateAsync(existingBlog);
            return updatedBlog == null ? null : MapToDTO(updatedBlog);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var blog = await _blogRepository.GetByIdAsync(id);
            if (blog == null)
                return false;

            // Xóa featured image nếu có
            if (!string.IsNullOrEmpty(blog.FeaturedImage))
            {
                var imageId = GetImageIdFromUrl(blog.FeaturedImage);
                if (imageId.HasValue)
                {
                    await _imageService.DeleteImage(imageId.Value);
                }
            }

            return await _blogRepository.DeleteAsync(id);
        }

        private BlogDTO MapToDTO(Blog blog)
        {
            return new BlogDTO
            {
                Id = blog.Id,
                Title = blog.Title,
                Content = blog.Content,
                FeaturedImage = blog.FeaturedImage,
                Category = blog.Category,
                Status = blog.Status,
                CreatedAt = blog.CreatedAt,
                UpdatedAt = blog.UpdatedAt,
                AuthorId = blog.AuthorId,
                AuthorName = blog.Author?.Username ?? "Unknown",
                Excerpt = blog.Excerpt,
                Slug = blog.Slug
            };
        }

        private string GenerateSlug(string title)
        {
            // Chuyển đổi title thành slug
            var slug = title.ToLower()
                .Replace(" ", "-")
                .Replace("đ", "d")
                .Replace("Đ", "D");
            
            // Thêm timestamp để đảm bảo unique
            return $"{slug}-{DateTime.UtcNow.Ticks}";
        }

        private int? GetImageIdFromUrl(string imageUrl)
        {
            // Giả sử URL có dạng: /uploads/images/{id}.{extension}
            var parts = imageUrl.Split('/');
            var lastPart = parts[parts.Length - 1];
            var idPart = lastPart.Split('.')[0];
            if (int.TryParse(idPart, out int id))
            {
                return id;
            }
            return null;
        }
    }
} 