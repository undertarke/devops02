using Hospital_API.Interfaces;
using Hospital_API.Models;
using Hospital_API.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_API.Services
{
    public class PrescriptionDetailsService : IPrescriptionDetailsService
    {
        private readonly IPrescriptionDetailsRepository _repo;
        public PrescriptionDetailsService(IPrescriptionDetailsRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<PrescriptionDetailsDTO>> GetAllAsync()
        {
            var details = await _repo.GetAllAsync();
            return details.Select(MapToDTO);
        }

        public async Task<PrescriptionDetailsDTO> GetByIdAsync(int id)
        {
            var detail = await _repo.GetByIdAsync(id);
            return detail == null ? null : MapToDTO(detail);
        }

        public async Task<PrescriptionDetailsDTO> AddAsync(PrescriptionDetailsDTO dto)
        {
            var detail = new PrescriptionDetails
            {
                PrescriptionID = dto.PrescriptionID,
                MedicineID = dto.MedicineID,
                Dosage = dto.Dosage,
                Quantity = dto.Quantity,
                Instructions = dto.Instructions
            };
            var result = await _repo.AddAsync(detail);
            return MapToDTO(result);
        }

        public async Task<PrescriptionDetailsDTO> UpdateAsync(PrescriptionDetailsDTO dto)
        {
            var detail = new PrescriptionDetails
            {
                Id = dto.Id,
                PrescriptionID = dto.PrescriptionID,
                MedicineID = dto.MedicineID,
                Dosage = dto.Dosage,
                Quantity = dto.Quantity,
                Instructions = dto.Instructions
            };
            var result = await _repo.UpdateAsync(detail);
            return MapToDTO(result);
        }

        public async Task<PrescriptionDetailsDTO> DeleteAsync(int id)
        {
            var result = await _repo.DeleteAsync(id);
            return result == null ? null : MapToDTO(result);
        }

        private PrescriptionDetailsDTO MapToDTO(PrescriptionDetails detail)
        {
            return new PrescriptionDetailsDTO
            {
                Id = detail.Id,
                PrescriptionID = detail.PrescriptionID,
                MedicineID = detail.MedicineID,
                Dosage = detail.Dosage,
                Quantity = detail.Quantity,
                Instructions = detail.Instructions
            };
        }
    }
}