using Hospital_API.Data;
using Hospital_API.Interfaces;
using Hospital_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Repositories
{
    public class MedicalPackageRepository : IMedicalPackageRepository
{
    private readonly HospitalDbContext _context;

    public MedicalPackageRepository(HospitalDbContext context)
    {
        _context = context;
    }

    public async Task<List<MedicalPackageDb>> GetAllAsync()
    {
        return await _context.MedicalPackages.ToListAsync();
    }

    public async Task<MedicalPackageDb?> GetByIdAsync(int id)
    {
        return await _context.MedicalPackages.FindAsync(id);
    }

    public async Task<MedicalPackageDb> CreateAsync(MedicalPackageDb package)
    {
        _context.MedicalPackages.Add(package);
        await _context.SaveChangesAsync();
        return package;
    }

    public async Task<bool> UpdateAsync(MedicalPackageDb package)
    {
        _context.MedicalPackages.Update(package);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteAsync(MedicalPackageDb package)
    {
        _context.MedicalPackages.Remove(package);
        return await _context.SaveChangesAsync() > 0;
    }
}

}