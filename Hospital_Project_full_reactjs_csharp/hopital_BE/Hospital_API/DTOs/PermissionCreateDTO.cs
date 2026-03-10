namespace Hospital_API.DTOs{
    public class PermissionCreateDto
{
    public string Name { get; set; } = null!;
    public string Code { get; set; } = null!;
    public string? Description { get; set; }
}

}