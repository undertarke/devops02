using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Hospital_API.Models;
using Microsoft.IdentityModel.Tokens;

namespace Hospital_API.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;
        private readonly IRoleRepository _roleRepository;

        private readonly IConfiguration _configuration;

        public AuthService(IAuthRepository authRepository, IConfiguration configuration, IRoleRepository roleRepository)
        {
            _authRepository = authRepository;
            _configuration = configuration;
            _roleRepository = roleRepository;
        }

        public async Task<AuthResponseDTO> LoginAsync(LoginDto request)
        {
            // 1. Tìm user theo username
            var user = await _authRepository.GetUserByUsernameAsync(request.Username);
            if (user == null)
                throw new Exception("Invalid username or password");

            // 2. Kiểm tra password hash (ví dụ dùng BCrypt)
            bool isValid = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);
            if (!isValid)
                throw new Exception("Invalid username or password");

            // 3. Lấy role
            var roles = user.UserRoles.Select(ur => ur.Role.Name).ToList();

            // 4. Tạo token
            var token = GenerateJwtToken(user, roles, out DateTime expiredAt);

            // Optional: Lưu lại token (nếu bạn muốn quản lý token)
            user.Token = token;
            user.TokenExpired = expiredAt;
            await _authRepository.SaveChangesAsync(); // Nếu bạn inject DbContext

            return new AuthResponseDTO
            {
                UserId = user.Id,
                Username = user.Username,
                FullName = user.FullName,
                Roles = roles,
                Token = token,
                ExpiredAt = expiredAt
            };


        }
        public async Task<bool> RegisterAsync(RegisterRequestDTO dto)
        {
            var existing = await _authRepository.GetUserByUsernameAsync(dto.Username);
            if (existing != null)
                throw new Exception("Username already exists");

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            var user = new User
            {
                Username = dto.Username,
                PasswordHash = passwordHash,
                FullName = dto.FullName,
                Email = dto.Email,
                Phone = dto.Phone,
                Gender = dto.Gender,
                DateOfBirth = dto.DateOfBirth,
                CreatedAt = DateTime.UtcNow,
                UserRoles = new List<UserRole>()
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




            await _authRepository.CreateUserAsync(user);
            await _authRepository.SaveChangesAsync();
            return true;
        }

        private string GenerateJwtToken(User user, List<string> roles, out DateTime expiredAt)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]!);
            expiredAt = DateTime.UtcNow.AddHours(3); // Hoặc thời gian khác

            var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim("FullName", user.FullName)
        };

            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = expiredAt,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"]
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);


        }

        public async Task<bool> LogoutAsync(int userId)
        {
            var user = await _authRepository.GetByIdAsync(userId);
            if (user == null) throw new Exception("User not found");

            user.Token = null;
            user.TokenExpired = null;

            await _authRepository.SaveChangesAsync();
            return true;
        }
        public async Task<string> GenerateResetTokenAsync(ForgotPasswordDTO dto)
        {
            var user = await _authRepository.GetUserByEmailAsync(dto.Email);
            if (user == null) throw new Exception("Email not found");

            user.ResetToken = Guid.NewGuid().ToString("N");
            user.ResetTokenExpired = DateTime.UtcNow.AddMinutes(15);

            await _authRepository.SaveChangesAsync();
            return user.ResetToken!;
        }
        public async Task<bool> ChangePasswordAsync(int userId, ChangePasswordDTO dto)
        {
            var user = await _authRepository.GetByIdAsync(userId);
            if (user == null) throw new Exception("User not found");

            if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.PasswordHash))
                throw new Exception("Current password is incorrect");

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            await _authRepository.SaveChangesAsync();
            return true;
        }
        public async Task<bool> ResetPasswordAsync(ResetPasswordDTO dto)
        {
            var user = await _authRepository.GetUserByResetTokenAsync(dto.Token);
            if (user == null)
                throw new Exception("Invalid or expired reset token");

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            user.ResetToken = null;
            user.ResetTokenExpired = null;

            await _authRepository.SaveChangesAsync();
            return true;
        }


    }

}