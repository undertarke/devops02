using Hospital_API.Data;
using Hospital_API.Interfaces;
using Hospital_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Repositories
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly HospitalDbContext _context;

        public PaymentRepository(HospitalDbContext context)
        {
            _context = context;
        }

        public async Task<List<Payment>> GetAllAsync() =>
            await _context.Payments.ToListAsync();

        public async Task<Payment?> GetByIdAsync(int id) =>
            await _context.Payments.FindAsync(id);

        public async Task<List<Payment>> GetByInvoiceIdAsync(int invoiceId) =>
            await _context.Payments
                .Where(p => p.InvoiceId == invoiceId)
                .ToListAsync();

        public async Task AddAsync(Payment payment)
        {
            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Payment payment)
        {
            _context.Payments.Update(payment);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Payment payment)
        {
            _context.Payments.Remove(payment);
            await _context.SaveChangesAsync();
        }
    }

}