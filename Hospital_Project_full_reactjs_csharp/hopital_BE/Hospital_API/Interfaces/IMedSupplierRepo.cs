
using Hospital_API.Models;

namespace Hospital_API.Interfaces
{
    public interface IMedicineSupplierRepository
    {
        Task<IEnumerable<MedicineSupplier>> GetAllAsync();
        Task<MedicineSupplier?> GetByIdAsync(int id);
        Task<MedicineSupplier> AddAsync(MedicineSupplier supplier);
        Task<MedicineSupplier?> UpdateAsync(MedicineSupplier supplier);
        Task<MedicineSupplier?> DeleteAsync(int id);
    }
}
