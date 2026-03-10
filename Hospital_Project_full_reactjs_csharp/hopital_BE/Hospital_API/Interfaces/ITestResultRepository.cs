using Hospital_API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Interfaces
{
    public interface ITestResultRepository
    {
        Task<IEnumerable<TestResult>> GetAllAsync();
        Task<TestResult> GetByIdAsync(int id);
        Task<TestResult> AddAsync(TestResult result);
        Task<TestResult> UpdateAsync(TestResult result);
        Task<TestResult> DeleteAsync(int id);
    }
}