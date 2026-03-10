using Hospital_API.Models;

namespace Hospital_API.Interfaces
{
    public interface IInvoiceDetailRepository
{
    Task<IEnumerable<InvoiceDetail>> GetAllAsync();
    Task<InvoiceDetail?> GetByIdAsync(int id);
    Task<IEnumerable<InvoiceDetail>> GetByInvoiceIdAsync(int invoiceId);

    Task AddAsync(InvoiceDetail entity);
    Task UpdateAsync(InvoiceDetail entity);
    Task DeleteAsync(InvoiceDetail entity);
}

}