using Hospital_API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Interfaces
{
    public interface IWaitingListRepository
    {
        Task<IEnumerable<WaitingList>> GetAllAsync();
        Task<WaitingList> GetByIdAsync(int id);
        Task<WaitingList> AddAsync(WaitingList waiting);
        Task<WaitingList> UpdateAsync(WaitingList waiting);
        Task<WaitingList> DeleteAsync(int id);
    }
}