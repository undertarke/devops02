namespace Hospital_API.DTOs
{
    public class MedicalRecordsDTO
    {
        public int Id { get; set; }
        public int AppointmentID { get; set; }
        public string Diagnosis { get; set; }
        public string Conclusion { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}