namespace Hospital_API.DTOs
{
    public class AssignRolesDto
    {
        public int UserId { get; set; }
        public List<int> RoleIds { get; set; } = new();
    }
}