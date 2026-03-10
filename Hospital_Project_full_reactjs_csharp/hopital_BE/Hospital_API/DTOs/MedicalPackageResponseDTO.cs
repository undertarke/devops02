namespace Hospital_API.DTOs
{
    public class MedicalPackageResponseDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public bool IsRecommended { get; set; }
        
    }
}