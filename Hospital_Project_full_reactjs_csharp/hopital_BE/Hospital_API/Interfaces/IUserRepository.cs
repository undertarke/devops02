using Hospital_API.Models;

namespace Hospital_API.Interfaces{
    public interface IUserRepository
{
    Task<User?> GetByIdAsync(int id);
        Task<User?> GetByUsernameAsync(string username);
        Task<List<User>> GetAllAsync();

        Task AddAsync(User user);
        
        /// <summary>
        /// Cập nhật entity User đã được attach.
        /// </summary>
        /// <param name="user"></param>
        void Update(User user);

        /// <summary>
        /// Xóa user theo id, nếu không tìm thấy thì không lỗi.
        /// </summary>
        /// <param name="id"></param>
        Task DeleteByIdAsync(int id);

        Task<bool> ExistsByUsernameAsync(string username);

        Task AssignRoleAsync(int userId, int roleId);

        /// <summary>
        /// Lưu tất cả thay đổi
        /// </summary>
        Task SaveChangesAsync();
    }
}
