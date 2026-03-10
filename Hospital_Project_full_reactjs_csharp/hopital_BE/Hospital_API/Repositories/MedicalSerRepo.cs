using Hospital_API.Models;
using Hospital_API.Interfaces;
using Hospital_API.Data;
using Microsoft.EntityFrameworkCore;
namespace Hospital_API.Repositories
{
    public class MedicalSerRepo : IMedServiceRepo
    {
        private readonly HospitalDbContext _hospitalDbContext;

        public MedicalSerRepo(HospitalDbContext hospitalDbContext)
        {
            _hospitalDbContext = hospitalDbContext;
        }
        //get all medical services
        public async Task<IEnumerable<MedicalServiceDb>> GetAllMedServices()
        {
            return await _hospitalDbContext.MedicalServices.ToListAsync();
        }
        //get medical service by id
        public async Task<MedicalServiceDb> GetMedServiceById(int id)
        {
            return await _hospitalDbContext.MedicalServices.FindAsync(id);
        }
        //create medical service
        public async Task<MedicalServiceDb> CreateMedService(MedicalServiceDb medService)
        {
            await _hospitalDbContext.MedicalServices.AddAsync(medService);
            await _hospitalDbContext.SaveChangesAsync();
            return medService;
        }
        //update medical service
        public async Task<MedicalServiceDb> UpdateMedService(MedicalServiceDb medService)
        {
            var existingMedService = await _hospitalDbContext.MedicalServices.FindAsync(medService.Id);
            if (existingMedService != null)
            {
                existingMedService.Name = medService.Name;
                existingMedService.Price = medService.Price;

                existingMedService.Type = medService.Type;
                existingMedService.Description = medService.Description;
                await _hospitalDbContext.SaveChangesAsync();
            }
            return existingMedService;
        }
        //delete medical service
        public async Task<MedicalServiceDb> DeleteMedService(int id)
        {
            var medService = await _hospitalDbContext.MedicalServices.FindAsync(id);
            if (medService != null)
            {
                _hospitalDbContext.MedicalServices.Remove(medService);
                await _hospitalDbContext.SaveChangesAsync();
            }
            return medService;
        }
    }
}