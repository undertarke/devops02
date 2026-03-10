using Hospital_API.DTOs;

namespace Hospital_API.Interfaces
{
    public interface IMedicinesService
    {

        Task<IEnumerable<MedicinesDTO>> GetAllAsync();
        Task<MedicinesDTO?> GetByIdAsync(int id);
        Task<MedicinesDTO> AddAsync(MedicinesCreateDTO dto);
        Task<MedicinesDTO?> UpdateAsync(int id, MedicinesCreateDTO dto);
        Task<bool> DeleteAsync(int id);
    }
}
