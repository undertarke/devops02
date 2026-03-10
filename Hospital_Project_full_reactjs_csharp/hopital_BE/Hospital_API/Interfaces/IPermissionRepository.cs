using Hospital_API.Models;

namespace Hospital_API.Interfaces{
    public interface IPermissionRepository
{
    Task<List<Permission>> GetAllAsync();
    Task<Permission?> GetByIdAsync(int id);
    Task AddAsync(Permission permission);
    void Update(Permission permission);
    void Delete(Permission permission);
    Task<bool> SaveChangesAsync();

    Task<List<Permission>> GetByRoleIdAsync(int roleId); // custom method
}

}