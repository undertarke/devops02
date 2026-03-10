namespace Hospital_API.DTOs
{
    public class WaitingListDTO
    {
        public int Id { get; set; }
        public int AppointmentID { get; set; }
        public int QueueNumber { get; set; }
        public string Status { get; set; }
    }
}