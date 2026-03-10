using Hospital_API.Models;
using Hospital_API.DTOs;
namespace Hospital_API.Interfaces
{
    public interface ILabTestService
    {
        Task<LabTestDTO> AddLabTestAsync(LabTestDTO labTestDTO);
        Task<IEnumerable<LabTestDTO>> GetAllLabTestsAsync();
        Task<LabTestDTO> UpdateLabTestAsync(LabTestDTO labTestDTO);
        Task<LabTestDTO> DeleteLabTestAsync(int id);
        Task<LabTestDTO> GetLabTestByIdAsync(int id);
    }
}