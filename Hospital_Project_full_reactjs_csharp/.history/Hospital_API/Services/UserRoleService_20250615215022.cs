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

        public UserRoleService(IUserRoleRepository repo, IRoleRepository roleRepo, IPatientRepository patientRepo)
        {
            _repo = repo;
            _roleRepo = roleRepo;
            _patientRepo = patientRepo;
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
            Console.WriteLine("Assigned role names: " + string.Join(", ", roleNames));
            if (roleNames.Contains("Patients"))
            {
                var patient = await _repo.GetByUserIdAsync(dto.UserId);
                Console.WriteLine("Assigned role patient1: " + string.Join(", ", patient));

                if (patient == null)
                {
                    Console.WriteLine("Assigned role patient: " + string.Join(", ", patient));

                    await _patientRepo.AddAsync(new Patient
                    {
                        UserId = dto.UserId,
                        InsuranceCode = "",
                        Address = "",
                        EmergencyContact = ""
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