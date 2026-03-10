using Hospital_API.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Interfaces
{
    public interface IWaitingListService
    {
        Task<IEnumerable<WaitingListDTO>> GetAllAsync();
        Task<WaitingListDTO> GetByIdAsync(int id);
        Task<WaitingListDTO> AddAsync(WaitingListDTO dto);
        Task<WaitingListDTO> UpdateAsync(WaitingListDTO dto);
        Task<WaitingListDTO> DeleteAsync(int id);
    }
}