using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hospital_API.Models
{
    public class TestResult
    {
        [Key]
        public int Id { get; set; }

        public int TestRequestID { get; set; }
        [ForeignKey("TestRequestID")]
        public TestRequest TestRequest { get; set; }

        public string Result { get; set; }
        public DateTime ResultDate { get; set; }
    }
}