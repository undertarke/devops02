using Hospital_API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Interfaces
{
    public interface IPrescriptionsRepository
    {
        Task<IEnumerable<Prescriptions>> GetAllAsync();
        Task<Prescriptions> GetByIdAsync(int id);
        Task<Prescriptions> AddAsync(Prescriptions prescription);
        Task<Prescriptions> UpdateAsync(Prescriptions prescription);
        Task<Prescriptions> DeleteAsync(int id);
    }
}