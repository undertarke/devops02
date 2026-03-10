using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Hospital_API.Mapping;
using Hospital_API.Models;
using Microsoft.IdentityModel.Tokens;

namespace Hospital_API.Services
{
    public class UserService : IUserService
    {

        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;

        private readonly IConfiguration _configuration;

        public UserService(IUserRepository userRepository, IConfiguration configuration, IRoleRepository roleRepository)
        {
            _userRepository = userRepository;
            _roleRepository = roleRepository;
            _configuration = configuration;
        }
      

        public async Task<UserResponse?> GetByIdAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null) return null;

            return UserMapper.ToDto(user);
        }

        public async Task<List<UserResponse>> GetAllAsync()
        {
            var users = await _userRepository.GetAllAsync();
            return users.Select(u => UserMapper.ToDto(u)).ToList();
        }

        public async Task<UserResponse> CreateAsync(UserCreateDto dto)
        {
            if (await _userRepository.ExistsByUsernameAsync(dto.Username))
                throw new Exception("Username already exists");

            var user = new User
            {
                Username = dto.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                FullName = dto.FullName,
                Email = dto.Email,
                Phone = dto.Phone,
                Gender = dto.Gender,
                DateOfBirth = dto.DateOfBirth,
                CreatedAt = DateTime.UtcNow,
                AvatarUrl = dto.AvatarUrl,
                UserRoles = new List<UserRole>{
                    new UserRole
                    {
                        RoleId = role.Id
                    }
                }

            };
            var patientRole = await _roleRepository.GetByNameAsync("Patient");
            if (patientRole == null)
                throw new Exception("Default role 'Patient' not found in database");

            user.UserRoles.Add(new UserRole
            {
                RoleId = patientRole.Id,
                User = user
            });

            user.Patient = new Patient
            {
                User = user, // gán object trực tiếp (EF sẽ map UserId tự động)
                InsuranceCode = "",
                Address = "",
                EmergencyContact = ""
            };



            await _userRepository.AddAsync(user);
            await _userRepository.SaveChangesAsync();

            return UserMapper.ToDto(user);
        }

        public async Task<bool> UpdateAsync(int id, UserUpdateDto dto)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null) return false;

            user.FullName = dto.FullName;
            user.Email = dto.Email;
            user.Phone = dto.Phone;
            user.Gender = dto.Gender;
            user.DateOfBirth = dto.DateOfBirth;
            user.AvatarUrl = dto.AvatarUrl;

            // Nếu cần update password, bạn có thể thêm logic ở đây (nhớ hash)

            _userRepository.Update(user);
            await _userRepository.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteByIdAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null) return false;

            await _userRepository.DeleteByIdAsync(id);
            await _userRepository.SaveChangesAsync();

            return true;
        }

        public async Task AssignRoleAsync(int userId, int roleId)
        {
            await _userRepository.AssignRoleAsync(userId, roleId);
            await _userRepository.SaveChangesAsync();
        }

        // Phần login JWT
        public async Task<string?> AuthenticateAsync(string username, string password)
        {
            var user = await _userRepository.GetByUsernameAsync(username);
            if (user == null) return null;

            bool verified = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (!verified) return null;

            // Tạo JWT token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]!);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
            };

            // Thêm role claims
            foreach (var ur in user.UserRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, ur.Role.Name));
            }
            var expires = DateTime.UtcNow.AddHours(2); // Thời gian hết hạn

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = expires,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"]
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);


            user.Token = tokenString;
            user.TokenExpired = expires;
            await _userRepository.SaveChangesAsync();
            return tokenString;
        }
        public async Task<bool> LogoutAsync(int userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null) return false;

            user.Token = null;
            user.TokenExpired = null;

            await _userRepository.SaveChangesAsync();
            return true;
        }
    }
}



