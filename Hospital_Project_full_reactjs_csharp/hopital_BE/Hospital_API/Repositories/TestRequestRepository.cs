using Hospital_API.Models;
using Hospital_API.Interfaces;
using Hospital_API.Data;
using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Repositories
{
    public class TestRequestRepository : ITestRequestRepository
    {
        private readonly HospitalDbContext _context;
        public TestRequestRepository(HospitalDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TestRequest>> GetAllAsync()
        {
            return await _context.TestRequests
                .Include(t => t.MedicalRecord)
                .Include(t => t.LabTest)
                .ToListAsync();
        }

        public async Task<TestRequest> GetByIdAsync(int id)
        {
            return await _context.TestRequests
                .Include(t => t.MedicalRecord)
                .Include(t => t.LabTest)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<TestRequest> AddAsync(TestRequest request)
        {
            await _context.TestRequests.AddAsync(request);
            await _context.SaveChangesAsync();
            return request;
        }

        public async Task<TestRequest> UpdateAsync(TestRequest request)
        {
            _context.TestRequests.Update(request);
            await _context.SaveChangesAsync();
            return request;
        }

        public async Task<TestRequest> DeleteAsync(int id)
        {
            var request = await _context.TestRequests.FindAsync(id);
            if (request != null)
            {
                _context.TestRequests.Remove(request);
                await _context.SaveChangesAsync();
            }
            return request;
        }
    }
}