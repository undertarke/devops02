using Hospital_API.Data;
using Hospital_API.Interfaces;
using Hospital_API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Repositories
{
    public class BlogRepository : IBlogRepository
    {
        private readonly HospitalDbContext _context;

        public BlogRepository(HospitalDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Blog>> GetAllAsync()
        {
            return await _context.Blogs
                .Include(b => b.Author)
                .ToListAsync();
        }

        public async Task<Blog?> GetByIdAsync(int id)
        {
            return await _context.Blogs
                .Include(b => b.Author)
                .FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<Blog> CreateAsync(Blog blog)
        {
            _context.Blogs.Add(blog);
            await _context.SaveChangesAsync();
            return blog;
        }

        public async Task<Blog?> UpdateAsync(Blog blog)
        {
            var existingBlog = await _context.Blogs.FindAsync(blog.Id);
            if (existingBlog == null)
                return null;

            _context.Entry(existingBlog).CurrentValues.SetValues(blog);
            await _context.SaveChangesAsync();
            return blog;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var blog = await _context.Blogs.FindAsync(id);
            if (blog == null)
                return false;

            _context.Blogs.Remove(blog);
            await _context.SaveChangesAsync();
            return true;
        }
    }
} 