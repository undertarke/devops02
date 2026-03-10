
using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Hospital_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicineSupplierController : ControllerBase
    {
        private readonly IMedicineSupplierService _service;


        public MedicineSupplierController(IMedicineSupplierService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedicineSupplierDTO>>> GetAll()
        {

            var list = await _service.GetAllAsync();
            return Ok(list);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MedicineSupplierDTO>> GetById(int id)
        {
            var item = await _service.GetByIdAsync(id);
            return item == null ? NotFound() : Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult<MedicineSupplierDTO>> Create(MedicineSupplierCreateDTO dto)
        {
            var created = await _service.AddAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.SupplierId }, created);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<MedicineSupplierDTO>> Update(int id, MedicineSupplierCreateDTO dto)
        {
            var updated = await _service.UpdateAsync(id, dto);
            return updated == null ? NotFound() : Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _service.DeleteAsync(id);
            return result == null ? NotFound() : NoContent();
        }
    }
}
