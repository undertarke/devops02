using Hospital_API.Models;

namespace Hospital_API.Interfaces
{
    public interface IMedicalPackageItemRepository
{
    Task<IEnumerable<MedicalPackageItemDb>> GetAllAsync();
    Task<MedicalPackageItemDb?> GetByIdAsync(int id);
    Task AddAsync(MedicalPackageItemDb item);
    Task DeleteAsync(int id);
    Task SaveChangesAsync();
}

}