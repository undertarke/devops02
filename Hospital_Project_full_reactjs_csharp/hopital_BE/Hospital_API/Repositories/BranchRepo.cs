using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Hospital_API.Models;
using Hospital_API.Interfaces;
using Hospital_API.Data;
namespace Hospital_API.Repositories
{
    public class BranchRepository : IBranchRepository
    {
        private readonly HospitalDbContext _context;
        public BranchRepository(HospitalDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Branch>> GetAllAsync()
        {
            return await _context.Branches.ToListAsync();
        }

        public async Task<Branch> GetByIdAsync(int id)
        {
            return await _context.Branches.FindAsync(id);
        }

        public async Task<Branch> AddAsync(Branch branch)
        {
            _context.Branches.Add(branch);
            await _context.SaveChangesAsync();
            return branch;
        }

        public async Task<Branch> UpdateAsync(Branch branch)
        {
            _context.Branches.Update(branch);
            await _context.SaveChangesAsync();
            return branch;
        }

        public async Task<Branch> DeleteAsync(int id)
        {
            var branch = await _context.Branches.FindAsync(id);
            if (branch != null)
            {
                _context.Branches.Remove(branch);
                await _context.SaveChangesAsync();
            }
            return branch;
        }
    }
}