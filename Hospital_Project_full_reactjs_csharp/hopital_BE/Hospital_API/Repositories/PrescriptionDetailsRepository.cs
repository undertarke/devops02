using Hospital_API.Models;
using Hospital_API.Interfaces;
using Hospital_API.Data;
using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Repositories
{
    public class PrescriptionDetailsRepository : IPrescriptionDetailsRepository
    {
        private readonly HospitalDbContext _context;
        public PrescriptionDetailsRepository(HospitalDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PrescriptionDetails>> GetAllAsync()
        {
            return await _context.PrescriptionDetails
                .Include(p => p.Prescription)
                .Include(p => p.Medicine)
                .ToListAsync();
        }

        public async Task<PrescriptionDetails> GetByIdAsync(int id)
        {
            return await _context.PrescriptionDetails
                .Include(p => p.Prescription)
                .Include(p => p.Medicine)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<PrescriptionDetails>> GetByPrescriptionIdAsync(int prescriptionId)
        {
            return await _context.PrescriptionDetails
                .Include(p => p.Medicine)
                .Where(p => p.PrescriptionID == prescriptionId)
                .ToListAsync();
        }

        public async Task<PrescriptionDetails> AddAsync(PrescriptionDetails detail)
        {
            await _context.PrescriptionDetails.AddAsync(detail);
            await _context.SaveChangesAsync();
            return await GetByIdAsync(detail.Id);
        }

        public async Task<PrescriptionDetails> UpdateAsync(PrescriptionDetails detail)
        {
            _context.PrescriptionDetails.Update(detail);
            await _context.SaveChangesAsync();
            return await GetByIdAsync(detail.Id);
        }

        public async Task<PrescriptionDetails> DeleteAsync(int id)
        {
            var detail = await _context.PrescriptionDetails.FindAsync(id);
            if (detail != null)
            {
                _context.PrescriptionDetails.Remove(detail);
                await _context.SaveChangesAsync();
            }
            return detail;
        }
    }
}