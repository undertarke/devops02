using Hospital_API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Interfaces
{
    public interface ITestRequestRepository
    {
        Task<IEnumerable<TestRequest>> GetAllAsync();
        Task<TestRequest> GetByIdAsync(int id);
        Task<TestRequest> AddAsync(TestRequest request);
        Task<TestRequest> UpdateAsync(TestRequest request);
        Task<TestRequest> DeleteAsync(int id);
    }
}