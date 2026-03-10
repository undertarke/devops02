namespace Hospital_API.DTOs
{
    public class TestResultDTO
    {
        public int Id { get; set; }
        public int TestRequestID { get; set; }
        public string Result { get; set; }
        public DateTime ResultDate { get; set; }
    }
}