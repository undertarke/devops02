using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using Microsoft.AspNetCore.Authorization;

namespace Hospital_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IBlogService _blogService;

        public BlogController(IBlogService blogService)
        {
            _blogService = blogService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlogDTO>>> GetAllBlogs()
        {
            var blogs = await _blogService.GetAllAsync();
            return Ok(blogs);
        }

        [HttpGet("admin")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<BlogDTO>>> GetAllBlogsAdmin()
        {
            var blogs = await _blogService.GetAllForAdminAsync();
            return Ok(blogs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BlogDTO>> GetBlogById(int id)
        {
            var blog = await _blogService.GetByIdAsync(id);
            if (blog == null)
                return NotFound();
            return Ok(blog);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<BlogDTO>> CreateBlog([FromForm] BlogCreateDTO blogCreateDto)
        {
            var blog = await _blogService.CreateAsync(blogCreateDto);
            return CreatedAtAction(nameof(GetBlogById), new { id = blog.Id }, blog);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<BlogDTO>> UpdateBlog(int id, [FromForm] BlogUpdateDTO blogUpdateDto)
        {
            var blog = await _blogService.UpdateAsync(id, blogUpdateDto);
            if (blog == null)
                return NotFound();
            return Ok(blog);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteBlog(int id)
        {
            var result = await _blogService.DeleteAsync(id);
            if (!result)
                return NotFound();
            return NoContent();
        }
    }
} 