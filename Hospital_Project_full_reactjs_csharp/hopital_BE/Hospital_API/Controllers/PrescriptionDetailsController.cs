using Microsoft.AspNetCore.Mvc;
using Hospital_API.Interfaces;
using Hospital_API.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PrescriptionDetailsController : ControllerBase
    {
        private readonly IPrescriptionDetailsService _service;
        public PrescriptionDetailsController(IPrescriptionDetailsService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PrescriptionDetailsDTO>>> GetAll()
        {
            var details = await _service.GetAllAsync();
            return Ok(details);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PrescriptionDetailsDTO>> GetById(int id)
        {
            var detail = await _service.GetByIdAsync(id);
            if (detail == null) return NotFound();
            return Ok(detail);
        }

        [HttpPost]
        public async Task<ActionResult<PrescriptionDetailsDTO>> Create([FromBody] PrescriptionDetailsDTO dto)
        {
            var created = await _service.AddAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<PrescriptionDetailsDTO>> Update(int id, [FromBody] PrescriptionDetailsDTO dto)
        {
            dto.Id = id;
            var updated = await _service.UpdateAsync(dto);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<PrescriptionDetailsDTO>> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (deleted == null) return NotFound();
            return Ok(deleted);
        }
    }
}