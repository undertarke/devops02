namespace Hospital_API.DTOs
{
    public class MedicalPackageItemDetailDTO
{
    public int ItemId { get; set; }
    public string ItemType { get; set; } = string.Empty;
    public string ItemName { get; set; } = string.Empty;
    public decimal ItemPrice { get; set; }
}

public class MedicalPackageDetailDTO
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public bool IsRecommended { get; set; }
    public List<MedicalPackageItemDetailDTO> Items { get; set; } = new();
}

}