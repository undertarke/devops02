using Microsoft.AspNetCore.Mvc;
using Hospital_API.Interfaces;
using Hospital_API.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PrescriptionsController : ControllerBase
    {
        private readonly IPrescriptionsService _service;
        public PrescriptionsController(IPrescriptionsService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PrescriptionsDTO>>> GetAll()
        {
            var prescriptions = await _service.GetAllAsync();
            return Ok(prescriptions);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PrescriptionsDTO>> GetById(int id)
        {
            var prescription = await _service.GetByIdAsync(id);
            if (prescription == null) return NotFound();
            return Ok(prescription);
        }

        [HttpPost]
        public async Task<ActionResult<PrescriptionsDTO>> Create([FromBody] PrescriptionsDTO dto)
        {
            var created = await _service.AddAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<PrescriptionsDTO>> Update(int id, [FromBody] PrescriptionsDTO dto)
        {
            dto.Id = id;
            var updated = await _service.UpdateAsync(dto);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<PrescriptionsDTO>> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (deleted == null) return NotFound();
            return Ok(deleted);
        }
    }
}