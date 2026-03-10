using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Hospital_API.Models;

namespace Hospital_API.Services
{
    public class RoomService : IRoomService
{
    private readonly IRoomRepository _repo;

    public RoomService(IRoomRepository repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<RoomDTO>> GetAllAsync()
    {
        var rooms = await _repo.GetAllAsync();
        return rooms.Select(r => MapToDTO(r));
    }

    public async Task<RoomDTO?> GetByIdAsync(int id)
    {
        var room = await _repo.GetByIdAsync(id);
        return room == null ? null : MapToDTO(room);
    }

    public async Task<RoomDTO> CreateAsync(RoomCreateDTO dto)
    {
        var room = new Room
        {
            Name = dto.Name,
            Description = dto.Description
        };

        await _repo.AddAsync(room);
        return MapToDTO(room);
    }

    public async Task<RoomDTO?> UpdateAsync(int id, RoomCreateDTO dto)
    {
        var room = await _repo.GetByIdAsync(id);
        if (room == null) return null;

        room.Name = dto.Name;
        room.Description = dto.Description;

        await _repo.UpdateAsync(room);
        return MapToDTO(room);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var room = await _repo.GetByIdAsync(id);
        if (room == null) return false;

        await _repo.DeleteAsync(room);
        return true;
    }

    private RoomDTO MapToDTO(Room room)
    {
        return new RoomDTO
        {
            Id = room.Id,
            Name = room.Name,
            Description = room.Description
        };
    }
}

}