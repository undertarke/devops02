using Hospital_API.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Interfaces
{
    public interface ITestRequestService
    {
        Task<IEnumerable<TestRequestDTO>> GetAllAsync();
        Task<TestRequestDTO> GetByIdAsync(int id);
        Task<TestRequestDTO> AddAsync(TestRequestDTO dto);
        Task<TestRequestDTO> UpdateAsync(TestRequestDTO dto);
        Task<TestRequestDTO> DeleteAsync(int id);
    }
}