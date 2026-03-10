using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hospital_API.DTOs;
using Hospital_API.Models;
using Hospital_API.Interfaces;

namespace Hospital_API.Services
{
    public class BranchService : IBranchService
    {
        private readonly IBranchRepository _repository;
        public BranchService(IBranchRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<BranchDTO>> GetAllAsync()
        {
            var branches = await _repository.GetAllAsync();
            return branches.Select(MapToDTO).ToList();
        }

        public async Task<BranchDTO> GetByIdAsync(int id)
        {
            var branch = await _repository.GetByIdAsync(id);
            return branch == null ? null : MapToDTO(branch);
        }

        public async Task<BranchDTO> AddAsync(BranchCreateDTO dto)
        {
            var branch = new Branch
            {
                Name = dto.Name,
                Address = dto.Address,
                Phone = dto.Phone
            };
            var result = await _repository.AddAsync(branch);
            return MapToDTO(result);
        }

        public async Task<BranchDTO> UpdateAsync(BranchDTO dto)
        {
            var branch = new Branch
            {
                Id = dto.Id,
                Name = dto.Name,
                Address = dto.Address,
                Phone = dto.Phone
            };
            var result = await _repository.UpdateAsync(branch);
            return MapToDTO(result);
        }

        public async Task<BranchDTO> DeleteAsync(int id)
        {
            var result = await _repository.DeleteAsync(id);
            return result == null ? null : MapToDTO(result);
        }

        private BranchDTO MapToDTO(Branch branch)
        {
            return new BranchDTO
            {
                Id = branch.Id,
                Name = branch.Name,
                Address = branch.Address,
                Phone = branch.Phone
            };
        }
    }
}