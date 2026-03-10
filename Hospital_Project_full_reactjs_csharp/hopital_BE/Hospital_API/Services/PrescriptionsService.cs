using Hospital_API.Interfaces;
using Hospital_API.Models;
using Hospital_API.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Services
{
    public class PrescriptionsService : IPrescriptionsService
    {
        private readonly IPrescriptionsRepository _repo;
        private readonly IPrescriptionDetailsRepository _detailsRepo;

        public PrescriptionsService(
            IPrescriptionsRepository repo,
            IPrescriptionDetailsRepository detailsRepo)
        {
            _repo = repo;
            _detailsRepo = detailsRepo;
        }

        public async Task<IEnumerable<PrescriptionsDTO>> GetAllAsync()
        {
            var prescriptions = await _repo.GetAllAsync();
            return prescriptions.Select(MapToDTO);
        }

        public async Task<PrescriptionsDTO> GetByIdAsync(int id)
        {
            var prescription = await _repo.GetByIdAsync(id);
            return prescription == null ? null : MapToDTO(prescription);
        }

        public async Task<PrescriptionsDTO> AddAsync(PrescriptionsDTO dto)
        {
            var prescription = new Prescriptions
            {
                MedicalRecordID = dto.MedicalRecordID,
                PrescribedBy = dto.PrescribedBy,
                CreatedAt = DateTime.UtcNow
            };

            var result = await _repo.AddAsync(prescription);

            // Add prescription details
            if (dto.Details != null && dto.Details.Any())
            {
                foreach (var detail in dto.Details)
                {
                    var prescriptionDetail = new PrescriptionDetails
                    {
                        PrescriptionID = result.Id,
                        MedicineID = detail.MedicineID,
                        Dosage = detail.Dosage,
                        Quantity = detail.Quantity,
                        Instructions = detail.Instructions
                    };
                    await _detailsRepo.AddAsync(prescriptionDetail);
                }
            }

            // Get the complete prescription with details
            return await GetByIdAsync(result.Id);
        }

        public async Task<PrescriptionsDTO> UpdateAsync(PrescriptionsDTO dto)
        {
            var prescription = new Prescriptions
            {
                Id = dto.Id,
                MedicalRecordID = dto.MedicalRecordID,
                PrescribedBy = dto.PrescribedBy,
                CreatedAt = dto.CreatedAt
            };

            var result = await _repo.UpdateAsync(prescription);

            // Get existing details
            var existingDetails = await _detailsRepo.GetByPrescriptionIdAsync(dto.Id);

            // Delete removed details
            foreach (var existingDetail in existingDetails)
            {
                if (!dto.Details.Any(d => d.Id == existingDetail.Id))
                {
                    await _detailsRepo.DeleteAsync(existingDetail.Id);
                }
            }

            // Update or add details
            foreach (var detail in dto.Details)
            {
                if (detail.Id > 0)
                {
                    // Update existing detail
                    var prescriptionDetail = new PrescriptionDetails
                    {
                        Id = detail.Id,
                        PrescriptionID = dto.Id,
                        MedicineID = detail.MedicineID,
                        Dosage = detail.Dosage,
                        Quantity = detail.Quantity,
                        Instructions = detail.Instructions
                    };
                    await _detailsRepo.UpdateAsync(prescriptionDetail);
                }
                else
                {
                    // Add new detail
                    var prescriptionDetail = new PrescriptionDetails
                    {
                        PrescriptionID = dto.Id,
                        MedicineID = detail.MedicineID,
                        Dosage = detail.Dosage,
                        Quantity = detail.Quantity,
                        Instructions = detail.Instructions
                    };
                    await _detailsRepo.AddAsync(prescriptionDetail);
                }
            }

            // Get the complete updated prescription with details
            return await GetByIdAsync(dto.Id);
        }

        public async Task<PrescriptionsDTO> DeleteAsync(int id)
        {
            // Get existing details
            var existingDetails = await _detailsRepo.GetByPrescriptionIdAsync(id);

            // Delete all details first
            foreach (var detail in existingDetails)
            {
                await _detailsRepo.DeleteAsync(detail.Id);
            }

            // Then delete the prescription
            var result = await _repo.DeleteAsync(id);
            return result == null ? null : MapToDTO(result);
        }

        private PrescriptionsDTO MapToDTO(Prescriptions prescription)
        {
            if (prescription == null) return null;

            return new PrescriptionsDTO
            {
                Id = prescription.Id,
                MedicalRecordID = prescription.MedicalRecordID,
                PrescribedBy = prescription.PrescribedBy,
                CreatedAt = prescription.CreatedAt,
                MedicalRecord = prescription.MedicalRecord == null ? null : new MedicalRecordsDTO
                {
                    Id = prescription.MedicalRecord.Id,
                    AppointmentID = prescription.MedicalRecord.AppointmentID,
                    Diagnosis = prescription.MedicalRecord.Diagnosis,
                    Conclusion = prescription.MedicalRecord.Conclusion,
                    CreatedAt = prescription.MedicalRecord.CreatedAt
                },
                Details = prescription.Details?.Select(d => new PrescriptionDetailsDTO
                {
                    Id = d.Id,
                    PrescriptionID = d.PrescriptionID,
                    MedicineID = d.MedicineID,
                    Dosage = d.Dosage,
                    Quantity = d.Quantity,
                    Instructions = d.Instructions
                }).ToList() ?? new List<PrescriptionDetailsDTO>()
            };
        }
    }
}