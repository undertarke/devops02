using Hospital_API.Data;
using Hospital_API.Interfaces;
using Hospital_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Repositories
{
    public class InvoiceDetailRepository : IInvoiceDetailRepository
{
    private readonly HospitalDbContext _context;

    public InvoiceDetailRepository(HospitalDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<InvoiceDetail>> GetAllAsync()
    {
        return await _context.InvoiceDetails.ToListAsync();
    }

    public async Task<InvoiceDetail?> GetByIdAsync(int id)
    {
        return await _context.InvoiceDetails.FindAsync(id);
    }

    public async Task<IEnumerable<InvoiceDetail>> GetByInvoiceIdAsync(int invoiceId)
    {
        return await _context.InvoiceDetails
            .Where(d => d.InvoiceId == invoiceId)
            .ToListAsync();
    }

    public async Task AddAsync(InvoiceDetail entity)
    {
        _context.InvoiceDetails.Add(entity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(InvoiceDetail entity)
    {
        _context.InvoiceDetails.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(InvoiceDetail entity)
    {
        _context.InvoiceDetails.Remove(entity);
        await _context.SaveChangesAsync();
    }
}

}