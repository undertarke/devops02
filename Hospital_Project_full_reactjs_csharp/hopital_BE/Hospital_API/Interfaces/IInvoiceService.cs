using Hospital_API.DTOs;

namespace Hospital_API.Interfaces
{
    public interface IInvoiceService
    {
        Task<IEnumerable<InvoiceDTO>> GetAllAsync();
        Task<InvoiceDTO?> GetByIdAsync(int id);
        Task<InvoiceDTO?> GetByAppointmentIdAsync(int appointmentId);
        Task<InvoiceDTO> CreateAsync(InvoiceCreateDTO dto);
        Task<InvoiceDTO?> UpdateAsync(InvoiceUpdateDTO dto);
        Task<List<InvoiceDTO>> GetInvoicesByPatientIdAsync(int patientId);
        Task<bool> DeleteAsync(int id);
        Task<int> CreateWithDetailsAsync(InvoiceCreateDTO dto);

    }

}