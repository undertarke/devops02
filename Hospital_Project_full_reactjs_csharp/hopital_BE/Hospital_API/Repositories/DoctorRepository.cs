using Hospital_API.Data;
using Hospital_API.Interfaces;
using Hospital_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Repositories
{
    public class DoctorRepository : IDoctorRepository
    {
        private readonly HospitalDbContext _context;

        public DoctorRepository(HospitalDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Doctor>> GetAllAsync()
        {
            return await _context.Doctors.Include(d => d.User).ToListAsync();
        }

        public async Task<Doctor?> GetByIdAsync(int id)
        {
            return await _context.Doctors.Include(d => d.User).FirstOrDefaultAsync(d => d.Id == id);
        }

        public async Task<Doctor?> GetByUserIdAsync(int userId)
        {
            return await _context.Doctors
            .Include(p => p.User)
            .FirstOrDefaultAsync(p => p.UserId == userId);
        }
        public async Task<List<Doctor>> GetByBranchIdAsync(int branchId)
            {
                return await _context.Doctors
                    .Include(d => d.User)
                    .Include(d => d.Branch)
                    .Where(d => d.BranchId == branchId)
                    .ToListAsync();
            }



        public async Task AddAsync(Doctor doctor)
        {
            await _context.Doctors.AddAsync(doctor);
        }

        public async Task UpdateAsync(Doctor doctor)
        {
            _context.Doctors.Update(doctor);
        }

        public async Task DeleteAsync(Doctor doctor)
        {
            _context.Doctors.Remove(doctor);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

       
    }

}