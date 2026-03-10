using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Hospital_API.Models;

namespace Hospital_API.Services
{
    public class PatientService : IPatientService
    {
        private readonly IPatientRepository _repo;

        public PatientService(IPatientRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<PatientResponse>> GetAllAsync()
        {
            var patients = await _repo.GetAllAsync();
            return patients.Select(p => new PatientResponse
            {
                Id = p.Id,
                UserId = p.UserId,
                FullName = p.User.FullName,
                InsuranceCode = p.InsuranceCode,
                Address = p.Address,
                EmergencyContact = p.EmergencyContact,

                Username = p.User.Username,
                Email = p.User.Email,
                Phone = p.User.Phone,
                Gender = p.User.Gender,
                AvatarUrl = p.User.AvatarUrl,
                Status = p.User.Status,
                DateOfBirth = p.User.DateOfBirth

            }).ToList();
        }

        public async Task<PatientResponse?> GetByIdAsync(int id)
        {
            var p = await _repo.GetByIdAsync(id);
            if (p == null) return null;

            return new PatientResponse
            {
                Id = p.Id,
                UserId = p.UserId,
                FullName = p.User.FullName,
                InsuranceCode = p.InsuranceCode,
                Address = p.Address,
                EmergencyContact = p.EmergencyContact,

                Username = p.User.Username,
                Email = p.User.Email,
                Phone = p.User.Phone,
                Gender = p.User.Gender,
                AvatarUrl = p.User.AvatarUrl,
                Status = p.User.Status,
                DateOfBirth = p.User.DateOfBirth
            };
        }
        public async Task<PatientResponse?> GetByUserIdAsync(int userId)
        {
            var p = await _repo.GetByUserIdAsync(userId);
            if (p == null) return null;

            return new PatientResponse
            {
                Id = p.Id,
                UserId = p.UserId,
                FullName = p.User.FullName,
                InsuranceCode = p.InsuranceCode,
                Address = p.Address,
                EmergencyContact = p.EmergencyContact,

                Username = p.User.Username,
                Email = p.User.Email,
                Phone = p.User.Phone,
                Gender = p.User.Gender,
                AvatarUrl = p.User.AvatarUrl,
                Status = p.User.Status,
                DateOfBirth = p.User.DateOfBirth
            };
        }

        public async Task<bool> CreateAsync(PatientCreateDTO dto)
        {
            var patient = new Patient
            {
                UserId = dto.UserId,
                InsuranceCode = dto.InsuranceCode,
                Address = dto.Address,
                EmergencyContact = dto.EmergencyContact
            };

            await _repo.AddAsync(patient);
            return await _repo.SaveChangesAsync();
        }

        public async Task<bool> UpdateAsync(int id, PatientUpdateDTO dto)
        {
            var existing = await _repo.GetByIdAsync(id);
            if (existing == null) return false;

            existing.InsuranceCode = dto.InsuranceCode;
            existing.Address = dto.Address;
            existing.EmergencyContact = dto.EmergencyContact;

            if (existing.User != null)
            {
                existing.User.FullName = dto.FullName;
                existing.User.Email = dto.Email;
                existing.User.Phone = dto.Phone;
                existing.User.Gender = dto.Gender;
                existing.User.DateOfBirth = dto.DateOfBirth;
                existing.User.Status = dto.Status;

            }

            _repo.Update(existing);
            return await _repo.SaveChangesAsync();
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var existing = await _repo.GetByIdAsync(id);
            if (existing == null) return false;

            _repo.Delete(existing);
            return await _repo.SaveChangesAsync();
        }
    }

}