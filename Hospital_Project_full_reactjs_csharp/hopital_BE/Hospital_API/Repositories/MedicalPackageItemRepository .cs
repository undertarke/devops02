using Hospital_API.Data;
using Hospital_API.Interfaces;
using Hospital_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Repositories
{
    public class MedicalPackageItemRepository : IMedicalPackageItemRepository
{
    private readonly HospitalDbContext _context;
    public MedicalPackageItemRepository(HospitalDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<MedicalPackageItemDb>> GetAllAsync()
        => await _context.MedicalPackageItems.ToListAsync();

    public async Task<MedicalPackageItemDb?> GetByIdAsync(int id)
        => await _context.MedicalPackageItems.FindAsync(id);

    public async Task AddAsync(MedicalPackageItemDb item)
        => await _context.MedicalPackageItems.AddAsync(item);

    public async Task DeleteAsync(int id)
    {
        var item = await _context.MedicalPackageItems.FindAsync(id);
        if (item != null)
            _context.MedicalPackageItems.Remove(item);
    }

    public async Task SaveChangesAsync()
        => await _context.SaveChangesAsync();
}

}