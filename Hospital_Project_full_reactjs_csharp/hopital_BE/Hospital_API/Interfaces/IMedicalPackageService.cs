using Hospital_API.DTOs;

namespace Hospital_API.Interfaces
{
    public interface IMedicalPackageService
    {
        Task<IEnumerable<MedicalPackageResponseDTO>> GetAllAsync();
        Task<MedicalPackageResponseDTO?> GetByIdAsync(int id);
        Task<MedicalPackageResponseDTO> CreateAsync(MedicalPackageCreateDTO dto);
        Task<bool> UpdateAsync(int id, MedicalPackageUpdateDTO dto);
        Task<bool> DeleteAsync(int id);
            Task<MedicalPackageDetailDTO?> GetByIdWithItemsAsync(int id);

}

}