using Hospital_API.Models;
namespace Hospital_API.Interfaces
{
    public interface IMedicinesRepository
    {

        Task<IEnumerable<Medicines>> GetAllAsync();
        Task<Medicines?> GetByIdAsync(int id);
        Task<Medicines> AddAsync(Medicines medicine);
        Task<Medicines?> UpdateAsync(Medicines medicine);
        Task<Medicines?> DeleteAsync(int id);
    }
}
