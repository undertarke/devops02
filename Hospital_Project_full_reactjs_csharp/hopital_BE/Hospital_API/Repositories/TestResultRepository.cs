using Hospital_API.Models;
using Hospital_API.Interfaces;
using Hospital_API.Data;
using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Repositories
{
    public class TestResultRepository : ITestResultRepository
    {
        private readonly HospitalDbContext _context;
        public TestResultRepository(HospitalDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TestResult>> GetAllAsync()
        {
            return await _context.TestResults
                .Include(t => t.TestRequest)
                .ToListAsync();
        }

        public async Task<TestResult> GetByIdAsync(int id)
        {
            return await _context.TestResults
                .Include(t => t.TestRequest)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<TestResult> AddAsync(TestResult result)
        {
            await _context.TestResults.AddAsync(result);
            await _context.SaveChangesAsync();
            return result;
        }

        public async Task<TestResult> UpdateAsync(TestResult result)
        {
            _context.TestResults.Update(result);
            await _context.SaveChangesAsync();
            return result;
        }

        public async Task<TestResult> DeleteAsync(int id)
        {
            var result = await _context.TestResults.FindAsync(id);
            if (result != null)
            {
                _context.TestResults.Remove(result);
                await _context.SaveChangesAsync();
            }
            return result;
        }
    }
}