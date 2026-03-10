using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Hospital_API.Models;

namespace Hospital_API.Services
{
    public class UserRoleService : IUserRoleService
    {
        private readonly IUserRoleRepository _repo;
        private readonly IRoleRepository _roleRepo;

        private readonly IPatientRepository _patientRepo;

        private readonly IDoctorRepository _doctorRepo;

        public UserRoleService(IUserRoleRepository repo, IRoleRepository roleRepo, IPatientRepository patientRepo, IDoctorRepository docterRepo)
        {
            _repo = repo;
            _roleRepo = roleRepo;
            _patientRepo = patientRepo;
            _doctorRepo = docterRepo;
        }

        public async Task<bool> AssignRolesAsync(AssignRolesDto dto)
        {
            await _repo.RemoveRangeByUserIdAsync(dto.UserId);

            var newUserRoles = dto.RoleIds.Distinct()
                .Select(roleId => new UserRole
                {
                    UserId = dto.UserId,
                    RoleId = roleId
                }).ToList();

            await _repo.AddRangeAsync(newUserRoles);

            var roleNames = new List<string>();
            foreach (var roleId in dto.RoleIds)
            {
                var role = await _roleRepo.GetByIdAsync(roleId);
                if (role != null) roleNames.Add(role.Name);

            }
            if (roleNames.Contains("Patient"))
            {
                var patient = await _patientRepo.GetByUserIdAsync(dto.UserId);

                if (patient == null)
                {

                    await _patientRepo.AddAsync(new Patient
                    {
                        UserId = dto.UserId,
                        InsuranceCode = "",
                        Address = "",
                        EmergencyContact = ""
                    });
                }
            }
            if (roleNames.Contains("Doctor"))
            {
                var doctor = await _doctorRepo.GetByUserIdAsync(dto.UserId);

                if (doctor == null)
                {

                    await _doctorRepo.AddAsync(new Doctor
                    {
                        UserId = dto.UserId,
                        Specialization = "",
                        Degree = "",
                        YearOfExperience = 0
                    });
                }
            }

            return await _repo.SaveChangesAsync();
        }

        public async Task<List<UserRoleDTO>> GetRolesByUserIdAsync(int userId)
        {
            var userRoles = await _repo.GetByUserIdAsync(userId);
            return userRoles.Select(ur => new UserRoleDTO
            {
                Id = ur.Role.Id,
                Name = ur.Role.Name
            }).ToList();
        }

        public async Task<bool> RemoveRoleAsync(int userId, int roleId)
        {
            return await _repo.RemoveAsync(userId, roleId);
        }
    }

}