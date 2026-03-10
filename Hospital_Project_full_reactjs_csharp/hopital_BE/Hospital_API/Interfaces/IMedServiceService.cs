using Hospital_API.Models;
using Hospital_API.DTOs;
namespace Hospital_API.Interfaces
{
    public interface IMedServiceService
    {
        Task<IEnumerable<MedicalServiceDTO>> GetAllMedServices();
        Task<MedicalServiceDTO> GetMedServiceById(int id);
        Task<MedicalServiceDTO> CreateMedService(MedicalServiceDTO medService);
        Task<MedicalServiceDTO> UpdateMedService(MedicalServiceDTO medService);
        Task<MedicalServiceDTO> DeleteMedService(int id);
    }
}
