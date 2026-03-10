using Hospital_API.Models;

namespace Hospital_API.DTOs
{
    public class DoctorScheduleDTO
{
    public int Id { get; set; }

    public int DoctorId { get; set; }
        public string? DoctorName { get; set; }

    public Doctor Doctor { get; set; } = null!;

    public int RoomId { get; set; }
    public Room Room { get; set; } = null!;

    public DayOfWeek DayOfWeek { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }

    public string? Note { get; set; }
}

}