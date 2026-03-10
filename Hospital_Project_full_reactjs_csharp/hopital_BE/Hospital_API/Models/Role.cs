
namespace Hospital_API.Models
{
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }
        public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();

        public ICollection<RolePermission> RolePermissions { get; set; }

    }
}