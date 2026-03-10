namespace Hospital_API.Interfaces
{
    public interface IRoomService
{
    Task<IEnumerable<RoomDTO>> GetAllAsync();
    Task<RoomDTO?> GetByIdAsync(int id);
    Task<RoomDTO> CreateAsync(RoomCreateDTO dto);
    Task<RoomDTO?> UpdateAsync(int id, RoomCreateDTO dto);
    Task<bool> DeleteAsync(int id);
}

}