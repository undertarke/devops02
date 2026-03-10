using Hospital_API.DTOs;

namespace Hospital_API.Interfaces
{
    public interface IDoctorService
{
    Task<IEnumerable<DoctorDTO>> GetAllAsync();
    Task<DoctorDTO?> GetByIdAsync(int id);
    Task<DoctorDTO?> GetByUserIdAsync(int userId);
    Task<List<DoctorDTO>> GetByBranchIdAsync(int branchId);

    Task<DoctorDTO> CreateAsync(DoctorCreateDTO dto);
    Task<DoctorDTO?> UpdateAsync(DoctorUpdateDTO dto);
    Task<bool> DeleteAsync(int id);
}

}