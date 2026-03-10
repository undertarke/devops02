using Microsoft.AspNetCore.Mvc;
using Hospital_API.Interfaces;
using Hospital_API.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestRequestController : ControllerBase
    {
        private readonly ITestRequestService _service;
        public TestRequestController(ITestRequestService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TestRequestDTO>>> GetAll()
        {
            var requests = await _service.GetAllAsync();
            return Ok(requests);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TestRequestDTO>> GetById(int id)
        {
            var request = await _service.GetByIdAsync(id);
            if (request == null) return NotFound();
            return Ok(request);
        }

        [HttpPost]
        public async Task<ActionResult<TestRequestDTO>> Create([FromBody] TestRequestDTO dto)
        {
            var created = await _service.AddAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TestRequestDTO>> Update(int id, [FromBody] TestRequestDTO dto)
        {
            dto.Id = id;
            var updated = await _service.UpdateAsync(dto);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TestRequestDTO>> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (deleted == null) return NotFound();
            return Ok(deleted);
        }
    }
}