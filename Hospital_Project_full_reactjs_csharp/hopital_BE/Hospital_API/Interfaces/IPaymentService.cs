using Hospital_API.DTOs;

namespace Hospital_API.Interfaces
{
    public interface IPaymentService
    {
        Task<IEnumerable<PaymentDTO>> GetAllAsync();
        Task<PaymentDTO?> GetByIdAsync(int id);
        Task<IEnumerable<PaymentDTO>> GetByInvoiceIdAsync(int invoiceId);
        Task<PaymentDTO> CreateAsync(PaymentCreateDTO dto);
        Task<PaymentDTO?> UpdateAsync(PaymentUpdateDTO dto);
        Task<bool> DeleteAsync(int id);
    }

}