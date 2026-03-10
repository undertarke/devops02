using Hospital_API.DTOs;

namespace Hospital_API.Interfaces
{
    public interface IMedicalPackageItemService
{
    Task<IEnumerable<MedicalPackageItemResponseDTO>> GetAllAsync();
    Task<MedicalPackageItemResponseDTO?> GetByIdAsync(int id);
    Task AddAsync(MedicalPackageItemCreateDTO dto);
    Task DeleteAsync(int id);
}

}