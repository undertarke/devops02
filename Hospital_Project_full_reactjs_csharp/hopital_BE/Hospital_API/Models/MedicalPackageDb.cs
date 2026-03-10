using System.ComponentModel.DataAnnotations;

namespace Hospital_API.Models
{
    public class MedicalPackageDb
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public bool IsRecommended { get; set; }

    public ICollection<MedicalPackageItemDb> Items { get; set; }
}

}