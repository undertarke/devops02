using Hospital_API.DTOs;

namespace Hospital_API.Interfaces
{
    public interface IPatientService
    {
        Task<List<PatientResponse>> GetAllAsync();
        Task<PatientResponse?> GetByIdAsync(int id);
        
        Task<PatientResponse> GetByUserIdAsync(int userId);
        
        Task<bool> CreateAsync(PatientCreateDTO dto);
        Task<bool> UpdateAsync(int id, PatientUpdateDTO dto);
        Task<bool> DeleteAsync(int id);
    }

}