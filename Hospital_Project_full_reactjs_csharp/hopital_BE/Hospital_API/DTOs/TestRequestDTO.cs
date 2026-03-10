namespace Hospital_API.DTOs
{
    public class TestRequestDTO
    {
        public int Id { get; set; }
        public int MedicalRecordID { get; set; }
        public int LabTestID { get; set; }
        public DateTime RequestedAt { get; set; }
    }
}