using Hospital_API.Models;

namespace Hospital_API.Interfaces
{
    public interface IMedicalPackageRepository
{
    Task<List<MedicalPackageDb>> GetAllAsync();
    Task<MedicalPackageDb?> GetByIdAsync(int id);
    Task<MedicalPackageDb> CreateAsync(MedicalPackageDb package);
    Task<bool> UpdateAsync(MedicalPackageDb package);
    Task<bool> DeleteAsync(MedicalPackageDb package);
}

}