using Hospital_API.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Interfaces
{
    public interface ITestResultService
    {
        Task<IEnumerable<TestResultDTO>> GetAllAsync();
        Task<TestResultDTO> GetByIdAsync(int id);
        Task<TestResultDTO> AddAsync(TestResultDTO dto);
        Task<TestResultDTO> UpdateAsync(TestResultDTO dto);
        Task<TestResultDTO> DeleteAsync(int id);
    }
}