using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Hospital_API.DTOs;
using Hospital_API.Interfaces;

namespace Hospital_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BranchController : ControllerBase
    {
        private readonly IBranchService _service;
        public BranchController(IBranchService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BranchDTO>>> GetAll()
        {
            var branches = await _service.GetAllAsync();
            return Ok(branches);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BranchDTO>> GetById(int id)
        {
            var branch = await _service.GetByIdAsync(id);
            if (branch == null) return NotFound();
            return Ok(branch);
        }

        [HttpPost]
        public async Task<ActionResult<BranchDTO>> Create([FromBody] BranchCreateDTO dto)
        {
            var created = await _service.AddAsync(dto);
            return Ok(created);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<BranchDTO>> Update(int id, [FromBody] BranchDTO dto)
        {
            dto.Id = id;
            var updated = await _service.UpdateAsync(dto);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<BranchDTO>> Delete(int id)
        {
            var deleted = await _service.DeleteAsync(id);
            if (deleted == null) return NotFound();
            return Ok(deleted);
        }
    }
}