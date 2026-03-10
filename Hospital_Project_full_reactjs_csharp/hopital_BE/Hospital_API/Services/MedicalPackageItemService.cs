using Hospital_API.Data;
using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Hospital_API.Models;

namespace Hospital_API.Services
{
    public class MedicalPackageItemService : IMedicalPackageItemService
    {
        private readonly IMedicalPackageItemRepository _repo;
        private readonly HospitalDbContext _context;

        public MedicalPackageItemService(IMedicalPackageItemRepository repo, HospitalDbContext context)
        {
            _repo = repo;
            _context = context;
        }

        public async Task<IEnumerable<MedicalPackageItemResponseDTO>> GetAllAsync()
        {
            var items = await _repo.GetAllAsync();

            var result = new List<MedicalPackageItemResponseDTO>();

            foreach (var item in items)
            {
                var dto = new MedicalPackageItemResponseDTO
                {
                    Id = item.Id,
                    PackageId = item.PackageId,
                    ItemId = item.ItemId,
                    ItemType = item.ItemType
                };

                // Load thêm tên và giá
                if (item.ItemType == "MedicalService")
                {
                    var service = await _context.MedicalServices.FindAsync(item.ItemId);
                    if (service != null)
                    {
                        dto.ItemName = service.Name;
                        dto.ItemPrice = service.Price;
                    }
                }
                else if (item.ItemType == "LabTest")
                {
                    var labTest = await _context.LabTests.FindAsync(item.ItemId);
                    if (labTest != null)
                    {
                        dto.ItemName = labTest.LabTestName;
                        dto.ItemPrice = labTest.LabTestPrice;
                    }
                }

                result.Add(dto);
            }

            return result;
        }

        public async Task<MedicalPackageItemResponseDTO?> GetByIdAsync(int id)
        {
            var item = await _repo.GetByIdAsync(id);
            if (item == null) return null;

            return new MedicalPackageItemResponseDTO
            {
                Id = item.Id,
                PackageId = item.PackageId,
                ItemType = item.ItemType,
                ItemId = item.ItemId
            };
        }

        public async Task AddAsync(MedicalPackageItemCreateDTO dto)
        {
            var entity = new MedicalPackageItemDb
            {
                PackageId = dto.PackageId,
                ItemType = dto.ItemType,
                ItemId = dto.ItemId
            };

            await _repo.AddAsync(entity);
            await _repo.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            await _repo.DeleteAsync(id);
            await _repo.SaveChangesAsync();
        }
    
}

}