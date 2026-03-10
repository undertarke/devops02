
using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Hospital_API.Models;

namespace Hospital_API.Services
{

    public class MedicinesService : IMedicinesService
    {
        private readonly IMedicinesRepository _repository;

        public MedicinesService(IMedicinesRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<MedicinesDTO>> GetAllAsync()
        {
            var medicines = await _repository.GetAllAsync();
            return medicines.Select(MapToDTO).ToList();
        }

        public async Task<MedicinesDTO?> GetByIdAsync(int id)
        {
            var med = await _repository.GetByIdAsync(id);
            return med == null ? null : MapToDTO(med);
        }

        public async Task<MedicinesDTO> AddAsync(MedicinesCreateDTO dto)
        {
            var entity = new Medicines
            {
                Code = dto.Code,
                Name = dto.Name,
                Type = dto.Type,
                ExpiryDate = dto.ExpiryDate,
                SupplierId = dto.SupplierId
            };

            var result = await _repository.AddAsync(entity);
            return MapToDTO(result);
        }

        public async Task<MedicinesDTO?> UpdateAsync(int id, MedicinesCreateDTO dto)
        {
            var existing = await _repository.GetByIdAsync(id);
            if (existing == null) return null;

            existing.Code = dto.Code;
            existing.Name = dto.Name;
            existing.Type = dto.Type;
            existing.ExpiryDate = dto.ExpiryDate;
            existing.SupplierId = dto.SupplierId;

            var result = await _repository.UpdateAsync(existing);
            return MapToDTO(result);
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var deleted = await _repository.DeleteAsync(id);
            return deleted != null;
        }

        private MedicinesDTO MapToDTO(Medicines m)
        {
            return new MedicinesDTO
            {
                Id = m.Id,
                Code = m.Code,
                Name = m.Name,
                Type = m.Type,
                SupplierName = m.Supplier?.SupplierName ?? "Không rõ",
                IsExpired = m.IsExpired
            };
        }
    }
}
