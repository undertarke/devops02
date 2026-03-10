namespace Hospital_API.DTOs
{
    public class MedicalPackageItemResponseDTO
{
    public int Id { get; set; }
    public int PackageId { get; set; }
    public string ItemType { get; set; }
    public int ItemId { get; set; }

    // Optional: thêm tên item nếu muốn load
    public string? ItemName { get; set; }
    public decimal? ItemPrice { get; set; }
}

}