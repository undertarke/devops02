using Hospital_API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace Hospital_API.Interfaces
{
    public interface ILabTestRepo
    {
        Task<IEnumerable<LabTest>> GetAllLabTests();
        Task<LabTest> GetLabTestById(int id);
        Task<LabTest> CreateLabTest(LabTest labTest);
        Task<LabTest> UpdateLabTest(LabTest labTest);
        Task<LabTest> DeleteLabTest(int id);
    }
}