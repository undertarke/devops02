using Hospital_API.Models;
using Hospital_API.Interfaces;
using Hospital_API.Data;
using Microsoft.EntityFrameworkCore;
namespace Hospital_API.Repositories
{
    public class LabTestRepo : ILabTestRepo
    {
        private readonly HospitalDbContext _context;
        public LabTestRepo(HospitalDbContext context)
        {
            _context = context;
        }
        //create labtest
        public async Task<LabTest> CreateLabTest(LabTest labTest)
        {
            await _context.LabTests.AddAsync(labTest);
            await _context.SaveChangesAsync();
            return labTest;
        }
        //delete labtest
        public async Task<LabTest> DeleteLabTest(int id)
        {
            var labTest = await _context.LabTests.FindAsync(id);
            if (labTest == null)
            {
                return null;
            }
            _context.LabTests.Remove(labTest);
            await _context.SaveChangesAsync();
            return labTest;
        }
        //get all labtest
        public async Task<IEnumerable<LabTest>> GetAllLabTests()
        {
            return await _context.LabTests.ToListAsync();
        }
        //get labtest by id
        public async Task<LabTest> GetLabTestById(int id)
        {
            return await _context.LabTests.FindAsync(id);
        }
        //update labtest
        public async Task<LabTest> UpdateLabTest(LabTest labTest)
        {
            var existingLabTest = await _context.LabTests.FindAsync(labTest.LabTestId);
            if (existingLabTest == null)
            {
                return null;
            }
            _context.Entry(existingLabTest).CurrentValues.SetValues(labTest);
            await _context.SaveChangesAsync();
            return existingLabTest;
        }
    }
}