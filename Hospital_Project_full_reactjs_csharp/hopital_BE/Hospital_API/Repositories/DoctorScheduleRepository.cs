using Hospital_API.Data;
using Hospital_API.Interfaces;
using Hospital_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Repositories
{
    public class DoctorScheduleRepository : IDoctorScheduleRepository
    {
        private readonly HospitalDbContext _context;

        public DoctorScheduleRepository(HospitalDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<DoctorSchedule>> GetAllAsync()
        {
            return await _context.DoctorSchedules
           .Include(ds => ds.Doctor)
               .ThenInclude(d => d.User) // vì tên bác sĩ nằm ở User
           .Include(ds => ds.Room)
           .ToListAsync();
        }

        public async Task<IEnumerable<DoctorSchedule>> GetByDoctorIdAsync(int doctorId)
        {
            return await _context.DoctorSchedules
                .Include(s => s.Doctor)
                .ThenInclude(d => d.User)
                .Include(s => s.Room)
                .Where(s => s.DoctorId == doctorId)
                .ToListAsync();
        }

        public async Task<DoctorSchedule?> GetByIdAsync(int id)
        {
            return await _context.DoctorSchedules
                .Include(s => s.Doctor)
                .Include(s => s.Room)
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task AddAsync(DoctorSchedule schedule)
        {
            _context.DoctorSchedules.Add(schedule);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(DoctorSchedule schedule)
        {
            _context.DoctorSchedules.Update(schedule);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(DoctorSchedule schedule)
        {
            _context.DoctorSchedules.Remove(schedule);
            await _context.SaveChangesAsync();
        }
    }

}