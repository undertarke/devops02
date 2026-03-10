namespace Hospital_API.DTOs
{
    public class DoctorScheduleCreateDTO
{
    public int DoctorId { get; set; }
    public int RoomId { get; set; }

    public DateTime Date { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }
    public string? Status { get; set; }

    public string? Note { get; set; }
}

}