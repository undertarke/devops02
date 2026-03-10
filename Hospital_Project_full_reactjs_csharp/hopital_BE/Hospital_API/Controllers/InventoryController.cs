using Microsoft.AspNetCore.Mvc;
using Hospital_API.Interfaces;
using Hospital_API.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryService _service;
        public InventoryController(IInventoryService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<InventoryDTO>>> GetAll()
        {
            var inventories = await _service.GetAllAsync();
            return Ok(inventories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<InventoryDTO>> GetById(int id)
        {
            var inventory = await _service.GetByIdAsync(id);
            if (inventory == null) return NotFound();
            return Ok(inventory);
        }

        [HttpPost]
        public async Task<ActionResult<InventoryDTO>> Create([FromBody] InventoryDTO dto)
        {
            var created = await _service.AddAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<InventoryDTO>> Update(int id, [FromBody] InventoryDTO dto)
        {
            dto.Id = id;
            var updated = await _service.UpdateAsync(dto);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<InventoryDTO>> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (deleted == null) return NotFound();
            return Ok(deleted);
        }
    }
}