using Hospital_API.Interfaces;
using Hospital_API.Models;
using Hospital_API.DTOs;
namespace Hospital_API.Services
{
    public class LabTestService : ILabTestService
    {
        private readonly ILabTestRepo _labTestRepo;

        public LabTestService(ILabTestRepo labTestRepo)
        {
            _labTestRepo = labTestRepo;
        }
        //get all 
        public async Task<IEnumerable<LabTestDTO>> GetAllLabTestsAsync()
        {
            var labTests = await _labTestRepo.GetAllLabTests();
            return labTests.Select(MapToDTO);
        }
        //get by id
        public async Task<LabTestDTO> GetLabTestByIdAsync(int id)
        {
            var labTest = await _labTestRepo.GetLabTestById(id);
            if (labTest == null)
            {
                return null;
            }
            return MapToDTO(labTest);
        }
        //create
        public async Task<LabTestDTO> AddLabTestAsync(LabTestDTO labTestDTO)
        {
            var labTest = new LabTest
            {
                LabTestName = labTestDTO.LabTestName,
                LabTestDescription = labTestDTO.LabTestDescription,
                LabTestPrice = labTestDTO.LabTestPrice,
            };
            var createdLabTest = await _labTestRepo.CreateLabTest(labTest);
            return MapToDTO(createdLabTest);
        }
        //update
        public async Task<LabTestDTO> UpdateLabTestAsync(LabTestDTO labTestDTO)
        {
            var labTest = new LabTest
            {
                LabTestId = labTestDTO.LabTestId,
                LabTestName = labTestDTO.LabTestName,
                LabTestDescription = labTestDTO.LabTestDescription,
                LabTestPrice = labTestDTO.LabTestPrice,
            };
            var updatedLabTest = await _labTestRepo.UpdateLabTest(labTest);
            if (updatedLabTest == null)
            {
                return null;
            }
            return MapToDTO(updatedLabTest);
        }
        //delete
        public async Task<LabTestDTO> DeleteLabTestAsync(int id)
        {
            var deletedLabTest = await _labTestRepo.DeleteLabTest(id);
            if (deletedLabTest == null)
            {
                return null;
            }
            return MapToDTO(deletedLabTest);
        }
        //map to DTO
        public LabTestDTO MapToDTO(LabTest labTest)
        {
            return new LabTestDTO
            {
                LabTestId = labTest.LabTestId,
                LabTestName = labTest.LabTestName,
                LabTestDescription = labTest.LabTestDescription,
                LabTestPrice = labTest.LabTestPrice,
            };
        }
    }
}