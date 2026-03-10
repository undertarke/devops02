namespace Hospital_API.Models
{
    public class DoctorSchedule
{
    public int Id { get; set; }

    public int DoctorId { get; set; }
    public Doctor Doctor { get; set; } = null!;

    public int RoomId { get; set; }
    public Room Room { get; set; } = null!;

    public DateTime Date { get; set; }
    public string? Status { get; set; }

    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }

    public string? Note { get; set; }
}

}