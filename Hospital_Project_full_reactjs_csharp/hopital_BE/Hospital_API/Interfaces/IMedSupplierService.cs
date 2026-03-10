using Hospital_API.DTOs;


namespace Hospital_API.Interfaces
{
    public interface IMedicineSupplierService
    {
        Task<IEnumerable<MedicineSupplierDTO>> GetAllAsync();

        Task<MedicineSupplierDTO?> GetByIdAsync(int id);
        Task<MedicineSupplierDTO> AddAsync(MedicineSupplierCreateDTO dto);
        Task<MedicineSupplierDTO?> UpdateAsync(int id, MedicineSupplierCreateDTO dto);
        Task<MedicineSupplierDTO?> DeleteAsync(int id);
    }
}
