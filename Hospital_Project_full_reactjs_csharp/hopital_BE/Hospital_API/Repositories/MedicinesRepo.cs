
using Hospital_API.Data;
using Hospital_API.Interfaces;
using Hospital_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Repositories
{
    public class MedicinesRepository : IMedicinesRepository
    {

        private readonly HospitalDbContext _context;

        public MedicinesRepository(HospitalDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Medicines>> GetAllAsync()
        {
            return await _context.Medicines.Include(m => m.Supplier).ToListAsync();
        }

        public async Task<Medicines?> GetByIdAsync(int id)
        {
            return await _context.Medicines.Include(m => m.Supplier)
                .FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<Medicines> AddAsync(Medicines medicine)
        {
            _context.Medicines.Add(medicine);
            await _context.SaveChangesAsync();
            return medicine;
        }

        public async Task<Medicines?> UpdateAsync(Medicines medicine)
        {
            var existing = await _context.Medicines.FindAsync(medicine.Id);
            if (existing == null) return null;

            existing.Code = medicine.Code;
            existing.Name = medicine.Name;
            existing.Type = medicine.Type;
            existing.ExpiryDate = medicine.ExpiryDate;
            existing.SupplierId = medicine.SupplierId;

            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<Medicines?> DeleteAsync(int id)
        {
            var med = await _context.Medicines.FindAsync(id);
            if (med == null) return null;

            _context.Medicines.Remove(med);
            await _context.SaveChangesAsync();
            return med;
        }
    }
}
