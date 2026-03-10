using Microsoft.AspNetCore.Mvc;
using Hospital_API.Interfaces;
using Hospital_API.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WaitingListController : ControllerBase
    {
        private readonly IWaitingListService _service;
        public WaitingListController(IWaitingListService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WaitingListDTO>>> GetAll()
        {
            var waitings = await _service.GetAllAsync();
            return Ok(waitings);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WaitingListDTO>> GetById(int id)
        {
            var waiting = await _service.GetByIdAsync(id);
            if (waiting == null) return NotFound();
            return Ok(waiting);
        }

        [HttpPost]
        public async Task<ActionResult<WaitingListDTO>> Create([FromBody] WaitingListDTO dto)
        {
            var created = await _service.AddAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<WaitingListDTO>> Update(int id, [FromBody] WaitingListDTO dto)
        {
            dto.Id = id;
            var updated = await _service.UpdateAsync(dto);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<WaitingListDTO>> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (deleted == null) return NotFound();
            return Ok(deleted);
        }
    }
}