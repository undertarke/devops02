using Hospital_API.Interfaces;
using Hospital_API.Models;
using Hospital_API.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_API.Services
{
    public class TestResultService : ITestResultService
    {
        private readonly ITestResultRepository _repo;
        public TestResultService(ITestResultRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<TestResultDTO>> GetAllAsync()
        {
            var results = await _repo.GetAllAsync();
            return results.Select(MapToDTO);
        }

        public async Task<TestResultDTO> GetByIdAsync(int id)
        {
            var result = await _repo.GetByIdAsync(id);
            return result == null ? null : MapToDTO(result);
        }

        public async Task<TestResultDTO> AddAsync(TestResultDTO dto)
        {
            var result = new TestResult
            {
                TestRequestID = dto.TestRequestID,
                Result = dto.Result,
                ResultDate = dto.ResultDate
            };
            var created = await _repo.AddAsync(result);
            return MapToDTO(created);
        }

        public async Task<TestResultDTO> UpdateAsync(TestResultDTO dto)
        {
            var result = new TestResult
            {
                Id = dto.Id,
                TestRequestID = dto.TestRequestID,
                Result = dto.Result,
                ResultDate = dto.ResultDate
            };
            var updated = await _repo.UpdateAsync(result);
            return MapToDTO(updated);
        }

        public async Task<TestResultDTO> DeleteAsync(int id)
        {
            var deleted = await _repo.DeleteAsync(id);
            return deleted == null ? null : MapToDTO(deleted);
        }

        private TestResultDTO MapToDTO(TestResult result)
        {
            return new TestResultDTO
            {
                Id = result.Id,
                TestRequestID = result.TestRequestID,
                Result = result.Result,
                ResultDate = result.ResultDate
            };
        }
    }
}