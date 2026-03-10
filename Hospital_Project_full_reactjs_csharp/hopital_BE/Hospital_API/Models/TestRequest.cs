using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hospital_API.Models
{
    public class TestRequest
    {
        [Key]
        public int Id { get; set; }

        public int MedicalRecordID { get; set; }
        [ForeignKey("MedicalRecordID")]
        public MedicalRecord MedicalRecord { get; set; }

        public int LabTestID { get; set; }
        [ForeignKey("LabTestID")]
        public LabTest LabTest { get; set; }

        public DateTime RequestedAt { get; set; }
    }
}