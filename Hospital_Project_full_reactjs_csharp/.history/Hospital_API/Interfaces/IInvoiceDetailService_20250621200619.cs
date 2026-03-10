using Hospital_API.DTOs;

namespace Hospital_API.Interfaces
{
    public interface IInvoiceDetailService
{
    Task<IEnumerable<InvoiceDetailDTO>> GetAllAsync();
    Task<IEnumerable<InvoiceDetailDTO>> GetByInvoiceIdAsync(int invoiceId);
    Task<InvoiceDetailDTO?> GetByIdAsync(int id);
    Task<InvoiceDetailDTO> CreateAsync(InvoiceDetailCreateDTO dto);
    Task<bool> DeleteAsync(int id);
}

}