using Hospital_API.Interfaces;
using Hospital_API.Models;
using Hospital_API.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital_API.Services
{
    public class WaitingListService : IWaitingListService
    {
        private readonly IWaitingListRepository _repo;
        public WaitingListService(IWaitingListRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<WaitingListDTO>> GetAllAsync()
        {
            var waitings = await _repo.GetAllAsync();
            return waitings.Select(MapToDTO);
        }

        public async Task<WaitingListDTO> GetByIdAsync(int id)
        {
            var waiting = await _repo.GetByIdAsync(id);
            return waiting == null ? null : MapToDTO(waiting);
        }

        public async Task<WaitingListDTO> AddAsync(WaitingListDTO dto)
        {
            var waiting = new WaitingList
            {
                AppointmentID = dto.AppointmentID,
                QueueNumber = dto.QueueNumber,
                Status = dto.Status
            };
            var result = await _repo.AddAsync(waiting);
            return MapToDTO(result);
        }

        public async Task<WaitingListDTO> UpdateAsync(WaitingListDTO dto)
        {
            var waiting = new WaitingList
            {
                Id = dto.Id,
                AppointmentID = dto.AppointmentID,
                QueueNumber = dto.QueueNumber,
                Status = dto.Status
            };
            var result = await _repo.UpdateAsync(waiting);
            return MapToDTO(result);
        }

        public async Task<WaitingListDTO> DeleteAsync(int id)
        {
            var result = await _repo.DeleteAsync(id);
            return result == null ? null : MapToDTO(result);
        }

        private WaitingListDTO MapToDTO(WaitingList waiting)
        {
            return new WaitingListDTO
            {
                Id = waiting.Id,
                AppointmentID = waiting.AppointmentID,
                QueueNumber = waiting.QueueNumber,
                Status = waiting.Status
            };
        }
    }
}