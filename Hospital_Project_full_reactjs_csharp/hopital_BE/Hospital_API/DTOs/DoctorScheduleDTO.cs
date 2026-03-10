using Hospital_API.Models;

namespace Hospital_API.DTOs
{
    public class DoctorScheduleDTO
    {
        public int Id { get; set; }
        public int DoctorId { get; set; }
        public string? DoctorName { get; set; }

        public int RoomId { get; set; }
        public string? RoomName { get; set; }

        public DateTime Date { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public string? Status { get; set; }

        public string? Note { get; set; }

}


}