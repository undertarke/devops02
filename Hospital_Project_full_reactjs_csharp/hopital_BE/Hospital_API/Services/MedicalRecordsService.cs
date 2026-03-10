using Hospital_API.Interfaces;
using Hospital_API.Models;
using Hospital_API.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_API.Services
{
    public class MedicalRecordsService : IMedicalRecordsService
    {
        private readonly IMedicalRecordsRepository _repo;
        public MedicalRecordsService(IMedicalRecordsRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<MedicalRecordsDTO>> GetAllAsync()
        {
            var records = await _repo.GetAllAsync();
            return records.Select(MapToDTO);
        }

        public async Task<MedicalRecordsDTO> GetByIdAsync(int id)
        {
            var record = await _repo.GetByIdAsync(id);
            return record == null ? null : MapToDTO(record);
        }

        public async Task<MedicalRecordsDTO> AddAsync(MedicalRecordsDTO dto)
        {
            var record = new MedicalRecord
            {
                AppointmentID = dto.AppointmentID,
                Diagnosis = dto.Diagnosis,
                Conclusion = dto.Conclusion,
                CreatedAt = dto.CreatedAt
            };
            var result = await _repo.AddAsync(record);
            return MapToDTO(result);
        }

        public async Task<MedicalRecordsDTO> UpdateAsync(MedicalRecordsDTO dto)
        {
            var record = new MedicalRecord
            {
                Id = dto.Id,
                AppointmentID = dto.AppointmentID,
                Diagnosis = dto.Diagnosis,
                Conclusion = dto.Conclusion,
                CreatedAt = dto.CreatedAt
            };
            var result = await _repo.UpdateAsync(record);
            return MapToDTO(result);
        }

        public async Task<MedicalRecordsDTO> DeleteAsync(int id)
        {
            var result = await _repo.DeleteAsync(id);
            return result == null ? null : MapToDTO(result);
        }

        private MedicalRecordsDTO MapToDTO(MedicalRecord record)
        {
            return new MedicalRecordsDTO
            {
                Id = record.Id,
                AppointmentID = record.AppointmentID,
                Diagnosis = record.Diagnosis,
                Conclusion = record.Conclusion,
                CreatedAt = record.CreatedAt
            };
        }
    }
}