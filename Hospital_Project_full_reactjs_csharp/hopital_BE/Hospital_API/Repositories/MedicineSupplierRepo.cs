
using Hospital_API.Data;
using Hospital_API.Interfaces;
using Hospital_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Repositories
{
    public class MedicineSupplierRepository : IMedicineSupplierRepository
    {
        private readonly HospitalDbContext _context;

        public MedicineSupplierRepository(HospitalDbContext context)
        {
            _context = context;
        }


        public async Task<IEnumerable<MedicineSupplier>> GetAllAsync()
        {
            return await _context.MedicineSuppliers.ToListAsync();
        }

        public async Task<MedicineSupplier?> GetByIdAsync(int id)
        {
            return await _context.MedicineSuppliers.FindAsync(id);
        }

        public async Task<MedicineSupplier> AddAsync(MedicineSupplier supplier)
        {
            _context.MedicineSuppliers.Add(supplier);
            await _context.SaveChangesAsync();
            return supplier;
        }

        public async Task<MedicineSupplier?> UpdateAsync(MedicineSupplier supplier)
        {
            var existing = await _context.MedicineSuppliers.FindAsync(supplier.SupplierId);
            if (existing == null) return null;

            existing.SupplierName = supplier.SupplierName;
            existing.Phone = supplier.Phone;
            existing.Address = supplier.Address;

            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<MedicineSupplier?> DeleteAsync(int id)
        {
            var supplier = await _context.MedicineSuppliers.FindAsync(id);
            if (supplier == null) return null;

            _context.MedicineSuppliers.Remove(supplier);
            await _context.SaveChangesAsync();
            return supplier;
        }
    }
}
