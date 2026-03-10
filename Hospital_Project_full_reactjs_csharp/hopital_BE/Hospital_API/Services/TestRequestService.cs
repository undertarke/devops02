using Hospital_API.Interfaces;
using Hospital_API.Models;
using Hospital_API.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_API.Services
{
    public class TestRequestService : ITestRequestService
    {
        private readonly ITestRequestRepository _repo;
        public TestRequestService(ITestRequestRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<TestRequestDTO>> GetAllAsync()
        {
            var requests = await _repo.GetAllAsync();
            return requests.Select(MapToDTO);
        }

        public async Task<TestRequestDTO> GetByIdAsync(int id)
        {
            var request = await _repo.GetByIdAsync(id);
            return request == null ? null : MapToDTO(request);
        }

        public async Task<TestRequestDTO> AddAsync(TestRequestDTO dto)
        {
            var request = new TestRequest
            {
                MedicalRecordID = dto.MedicalRecordID,
                LabTestID = dto.LabTestID,
                RequestedAt = dto.RequestedAt
            };
            var result = await _repo.AddAsync(request);
            return MapToDTO(result);
        }

        public async Task<TestRequestDTO> UpdateAsync(TestRequestDTO dto)
        {
            var request = new TestRequest
            {
                Id = dto.Id,
                MedicalRecordID = dto.MedicalRecordID,
                LabTestID = dto.LabTestID,
                RequestedAt = dto.RequestedAt
            };
            var result = await _repo.UpdateAsync(request);
            return MapToDTO(result);
        }

        public async Task<TestRequestDTO> DeleteAsync(int id)
        {
            var result = await _repo.DeleteAsync(id);
            return result == null ? null : MapToDTO(result);
        }

        private TestRequestDTO MapToDTO(TestRequest request)
        {
            return new TestRequestDTO
            {
                Id = request.Id,
                MedicalRecordID = request.MedicalRecordID,
                LabTestID = request.LabTestID,
                RequestedAt = request.RequestedAt
            };
        }
    }
}