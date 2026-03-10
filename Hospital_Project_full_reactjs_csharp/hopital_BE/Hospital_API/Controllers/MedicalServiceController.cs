using Hospital_API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Hospital_API.Models;
using Hospital_API.DTOs;
namespace Hospital_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicalServiceController : ControllerBase
    {
        private readonly IMedServiceService _medicinesService;

        public MedicalServiceController(IMedServiceService medicinesService)
        {
            _medicinesService = medicinesService;
        }

        [HttpGet]
        public async Task<ActionResult<MedicalServiceDTO>> GetAllMedicines()
        {
            var medicines = await _medicinesService.GetAllMedServices();
            return Ok(medicines);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MedicalServiceDTO>> GetMedicineById(int id)
        {
            var medicine = await _medicinesService.GetMedServiceById(id);
            if (medicine == null)
            {
                return NotFound();
            }
            return Ok(medicine);
        }

        [HttpPost]
        public async Task<ActionResult<MedicalServiceDTO>> CreateMedicine([FromBody] MedicalServiceDTO medicineDb)
        {
            if (medicineDb == null)
            {
                return BadRequest();
            }
            var createdMedicine = await _medicinesService.CreateMedService(medicineDb);
            return CreatedAtAction(nameof(GetMedicineById), new { id = createdMedicine.Id }, createdMedicine);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<MedicalServiceDTO>> UpdateMedicine(int id, [FromBody] MedicalServiceDTO medicineDb)
        {
            if (id != medicineDb.Id || medicineDb == null)
            {
                return BadRequest();
            }
            var updatedMedicine = await _medicinesService.UpdateMedService(medicineDb);
            if (updatedMedicine == null)
            {
                return NotFound();
            }
            return Ok(updatedMedicine);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MedicalServiceDTO>> DeleteMedicine(int id)
        {
            var deletedMedicine = await _medicinesService.DeleteMedService(id);
            if (deletedMedicine == null)
            {
                return NotFound();
            }
            return NoContent();
        }
        
    }
}
