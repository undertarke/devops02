namespace Hospital_API.DTOs
{
    public class MedicalPackageUpdateDTO
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public bool IsRecommended { get; set; }
    }

}