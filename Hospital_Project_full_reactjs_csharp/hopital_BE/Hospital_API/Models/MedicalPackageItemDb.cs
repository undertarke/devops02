using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Hospital_API.Models
{
    public class MedicalPackageItemDb
{
    [Key]
    public int Id { get; set; }

    [ForeignKey("MedicalPackage")]
    public int PackageId { get; set; }

    public string ItemType { get; set; } // "Service" hoặc "LabTest"
    public int ItemId { get; set; } // Id của Service hoặc LabTest

    public MedicalPackageDb MedicalPackage { get; set; }
}

}