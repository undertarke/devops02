using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hospital_API.Models
{
    public class Prescriptions
    {
        [Key]
        public int Id { get; set; }

        public int MedicalRecordID { get; set; }

        [ForeignKey("MedicalRecordID")]
        public MedicalRecord MedicalRecord { get; set; }

        public string PrescribedBy { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation properties
        public ICollection<PrescriptionDetails> Details { get; set; } = new List<PrescriptionDetails>();
    }
}