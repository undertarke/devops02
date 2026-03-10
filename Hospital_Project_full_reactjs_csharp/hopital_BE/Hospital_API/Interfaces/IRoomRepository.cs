using Hospital_API.Models;

namespace Hospital_API.Interfaces
{
    public interface IRoomRepository
{
    Task<IEnumerable<Room>> GetAllAsync();
    Task<Room?> GetByIdAsync(int id);
    Task AddAsync(Room room);
    Task UpdateAsync(Room room);
    Task DeleteAsync(Room room);
}

}