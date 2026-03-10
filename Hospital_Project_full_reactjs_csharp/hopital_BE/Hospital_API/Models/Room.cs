namespace Hospital_API.Models
{
    public class Room
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }

    public ICollection<DoctorSchedule> DoctorSchedules { get; set; } = new List<DoctorSchedule>();
}

}