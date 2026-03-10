using Hospital_API.Models;
using Hospital_API.Interfaces;
using Hospital_API.Data;
using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Repositories
{
    public class MedicalRecordsRepository : IMedicalRecordsRepository
    {
        private readonly HospitalDbContext _context;
        public MedicalRecordsRepository(HospitalDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<MedicalRecord>> GetAllAsync()
        {
            return await _context.MedicalRecords.Include(m => m.Appointment).ToListAsync();
        }

        public async Task<MedicalRecord> GetByIdAsync(int id)
        {
            return await _context.MedicalRecords.Include(m => m.Appointment).FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<MedicalRecord> AddAsync(MedicalRecord record)
        {
            await _context.MedicalRecords.AddAsync(record);
            await _context.SaveChangesAsync();
            return record;
        }

        public async Task<MedicalRecord> UpdateAsync(MedicalRecord record)
        {
            _context.MedicalRecords.Update(record);
            await _context.SaveChangesAsync();
            return record;
        }

        public async Task<MedicalRecord> DeleteAsync(int id)
        {
            var record = await _context.MedicalRecords.FindAsync(id);
            if (record != null)
            {
                _context.MedicalRecords.Remove(record);
                await _context.SaveChangesAsync();
            }
            return record;
        }
    }
}