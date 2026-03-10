namespace Hospital_API.DTOs
{
    public class AssignPermissionsDto
    {
        public int RoleId { get; set; }
        public List<int> PermissionIds { get; set; } = new();
    }
}