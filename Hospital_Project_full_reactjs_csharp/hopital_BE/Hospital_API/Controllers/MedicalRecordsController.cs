using Microsoft.AspNetCore.Mvc;
using Hospital_API.Interfaces;
using Hospital_API.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicalRecordsController : ControllerBase
    {
        private readonly IMedicalRecordsService _service;
        public MedicalRecordsController(IMedicalRecordsService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedicalRecordsDTO>>> GetAll()
        {
            var records = await _service.GetAllAsync();
            return Ok(records);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MedicalRecordsDTO>> GetById(int id)
        {
            var record = await _service.GetByIdAsync(id);
            if (record == null) return NotFound();
            return Ok(record);
        }

        [HttpPost]
        public async Task<ActionResult<MedicalRecordsDTO>> Create([FromBody] MedicalRecordsDTO dto)
        {
            var created = await _service.AddAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<MedicalRecordsDTO>> Update(int id, [FromBody] MedicalRecordsDTO dto)
        {
            dto.Id = id;
            var updated = await _service.UpdateAsync(dto);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MedicalRecordsDTO>> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (deleted == null) return NotFound();
            return Ok(deleted);
        }
    }
}