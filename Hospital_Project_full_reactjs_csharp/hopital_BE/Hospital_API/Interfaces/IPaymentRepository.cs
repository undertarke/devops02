using Hospital_API.Models;

namespace Hospital_API.Interfaces
{
    public interface IPaymentRepository
    {
        Task<List<Payment>> GetAllAsync();
        Task<Payment?> GetByIdAsync(int id);
        Task<List<Payment>> GetByInvoiceIdAsync(int invoiceId);
        Task AddAsync(Payment payment);
        Task UpdateAsync(Payment payment);
        Task DeleteAsync(Payment payment);
    }

}