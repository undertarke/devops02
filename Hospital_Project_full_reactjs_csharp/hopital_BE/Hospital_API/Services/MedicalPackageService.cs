using Hospital_API.Data;
using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Hospital_API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Services
{
    public class MedicalPackageService : IMedicalPackageService
    {
        private readonly IMedicalPackageRepository _repo;
        private readonly IMedicalPackageItemRepository _packageItemRepo;
        private readonly HospitalDbContext _context;

         public MedicalPackageService(
        IMedicalPackageRepository repo,
        IMedicalPackageItemRepository packageItemRepo,
        HospitalDbContext context)
    {
        _repo = repo;
        _packageItemRepo = packageItemRepo;
        _context = context;
    }

        public async Task<IEnumerable<MedicalPackageResponseDTO>> GetAllAsync()
        {
            var packages = await _repo.GetAllAsync();

            return packages.Select(p => new MedicalPackageResponseDTO
            {
                Id = p.Id,
                Name = p.Name,
                Price = p.Price,
                IsRecommended = p.IsRecommended
            }).ToList();
        }

        public async Task<MedicalPackageResponseDTO?> GetByIdAsync(int id)
        {
            var pkg = await _repo.GetByIdAsync(id);
            if (pkg == null) return null;

            return new MedicalPackageResponseDTO
            {
                Id = pkg.Id,
                Name = pkg.Name,
                Price = pkg.Price,
                IsRecommended = pkg.IsRecommended
            };
        }

        public async Task<MedicalPackageResponseDTO> CreateAsync(MedicalPackageCreateDTO dto)
        {
            var entity = new MedicalPackageDb
            {
                Name = dto.Name,
                Price = dto.Price,
                IsRecommended = dto.IsRecommended
            };

            var created = await _repo.CreateAsync(entity);

            return new MedicalPackageResponseDTO
            {
                Id = created.Id,
                Name = created.Name,
                Price = created.Price,
                IsRecommended = created.IsRecommended
            };
        }

        public async Task<bool> UpdateAsync(int id, MedicalPackageUpdateDTO dto)
        {
            var entity = await _repo.GetByIdAsync(id);
            if (entity == null) return false;

            entity.Name = dto.Name;
            entity.Price = dto.Price;
            entity.IsRecommended = dto.IsRecommended;

            return await _repo.UpdateAsync(entity);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _repo.GetByIdAsync(id);
            if (entity == null) return false;

            return await _repo.DeleteAsync(entity);
        }
        public async Task<MedicalPackageDetailDTO?> GetByIdWithItemsAsync(int id)
{
    var package = await _repo.GetByIdAsync(id);
    if (package == null) return null;

    var items = await _packageItemRepo.GetAllAsync();
    var relatedItems = items.Where(x => x.PackageId == id).ToList();

    var result = new MedicalPackageDetailDTO
    {
        Id = package.Id,
        Name = package.Name,
        Price = package.Price,
        IsRecommended = package.IsRecommended,
        Items = new List<MedicalPackageItemDetailDTO>()
    };

    foreach (var item in relatedItems)
    {
        string name = "";
        decimal price = 0;

        if (item.ItemType == "MedicalService")
        {
            var service = await _context.MedicalServices.FindAsync(item.ItemId);
            if (service != null)
            {
                name = service.Name;
                price = service.Price;
            }
        }
        else if (item.ItemType == "LabTest")
        {
            var labTest = await _context.LabTests.FindAsync(item.ItemId);
            if (labTest != null)
            {
                name = labTest.LabTestName;
                price = labTest.LabTestPrice;
            }
        }

        result.Items.Add(new MedicalPackageItemDetailDTO
        {
            ItemId = item.ItemId,
            ItemType = item.ItemType,
            ItemName = name,
            ItemPrice = price
        });
    }

    return result;
}

    }
}
