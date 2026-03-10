
using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Hospital_API.Models;

namespace Hospital_API.Services
{
    public class MedicineSupplierService : IMedicineSupplierService
    {
        private readonly IMedicineSupplierRepository _repository;

        public MedicineSupplierService(IMedicineSupplierRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<MedicineSupplierDTO>> GetAllAsync()
        {
            var list = await _repository.GetAllAsync();
            return list.Select(MapToDTO).ToList();
        }

        public async Task<MedicineSupplierDTO?> GetByIdAsync(int id)
        {
            var supplier = await _repository.GetByIdAsync(id);
            return supplier == null ? null : MapToDTO(supplier);
        }

        public async Task<MedicineSupplierDTO> AddAsync(MedicineSupplierCreateDTO dto)
        {
            var entity = new MedicineSupplier
            {
                SupplierName = dto.SupplierName,
                Phone = dto.Phone,
                Address = dto.Address
            };

            var created = await _repository.AddAsync(entity);
            return MapToDTO(created);
        }

        public async Task<MedicineSupplierDTO?> UpdateAsync(int id, MedicineSupplierCreateDTO dto)
        {
            var entity = new MedicineSupplier
            {
                SupplierId = id,
                SupplierName = dto.SupplierName,
                Phone = dto.Phone,
                Address = dto.Address
            };

            var updated = await _repository.UpdateAsync(entity);
            return updated == null ? null : MapToDTO(updated);
        }

        public async Task<MedicineSupplierDTO?> DeleteAsync(int id)
        {
            var deleted = await _repository.DeleteAsync(id);
            return deleted == null ? null : MapToDTO(deleted);
        }

        private MedicineSupplierDTO MapToDTO(MedicineSupplier supplier)
        {
            return new MedicineSupplierDTO
            {
                SupplierId = supplier.SupplierId,
                SupplierName = supplier.SupplierName,
                Phone = supplier.Phone,
                Address = supplier.Address
            };
        }
    }
}
