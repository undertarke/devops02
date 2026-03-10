using Hospital_API.Models;

namespace Hospital_API.Interfaces
{
    public interface IMedServiceRepo
    {
        Task<IEnumerable<MedicalServiceDb>> GetAllMedServices();
        Task<MedicalServiceDb> GetMedServiceById(int id);
        Task<MedicalServiceDb> CreateMedService(MedicalServiceDb medService);
        Task<MedicalServiceDb> UpdateMedService(MedicalServiceDb medService);
        Task<MedicalServiceDb> DeleteMedService(int id);
    }
}