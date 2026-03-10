using Microsoft.AspNetCore.Mvc;
using Hospital_API.Interfaces;
using Hospital_API.DTOs;
using System.Threading.Tasks;
namespace Hospital_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LabTestController : ControllerBase
    {
        private readonly ILabTestService _labTestService;
        public LabTestController(ILabTestService labTestService)
        {
            _labTestService = labTestService;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LabTestDTO>>> GetAllLabTests()
        {
            var labTests = await _labTestService.GetAllLabTestsAsync();
            return Ok(labTests);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<LabTestDTO>> GetLabTestById(int id)
        {
            var labTest = await _labTestService.GetLabTestByIdAsync(id);
            if (labTest == null)
            {
                return NotFound();
            }
            return Ok(labTest);
        }
        [HttpPost]
        public async Task<ActionResult<LabTestDTO>> AddLabTest([FromBody] LabTestDTO labTestDTO)
        {
            var createdLabTest = await _labTestService.AddLabTestAsync(labTestDTO);
            return CreatedAtAction(nameof(GetLabTestById), new { id = createdLabTest.LabTestId }, createdLabTest);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<LabTestDTO>> UpdateLabTest(int id, [FromBody] LabTestDTO labTestDTO)
        {
            if (id != labTestDTO.LabTestId)
            {
                return BadRequest();
            }
            var updatedLabTest = await _labTestService.UpdateLabTestAsync(labTestDTO);
            if (updatedLabTest == null)
            {
                return NotFound();
            }
            return Ok(updatedLabTest);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<LabTestDTO>> DeleteLabTest(int id)
        {
            var deletedLabTest = await _labTestService.DeleteLabTestAsync(id);
            if (deletedLabTest == null)
            {
                return NotFound();
            }
            return Ok(deletedLabTest);
        }
    }
}