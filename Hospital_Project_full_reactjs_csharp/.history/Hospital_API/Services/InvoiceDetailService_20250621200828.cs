using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Hospital_API.Models;

namespace Hospital_API.Services
{
    public class InvoiceDetailService : IInvoiceDetailService
{
    private readonly IInvoiceDetailRepository _repo;

    public InvoiceDetailService(IInvoiceDetailRepository repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<InvoiceDetailDTO>> GetAllAsync()
    {
        var data = await _repo.GetAllAsync();
        return data.Select(x => ToDTO(x));
    }

    public async Task<IEnumerable<InvoiceDetailDTO>> GetByInvoiceIdAsync(int invoiceId)
    {
        var data = await _repo.GetByInvoiceIdAsync(invoiceId);
        return data.Select(x => ToDTO(x));
    }

    public async Task<InvoiceDetailDTO?> GetByIdAsync(int id)
    {
        var entity = await _repo.GetByIdAsync(id);
        return entity == null ? null : ToDTO(entity);
    }

    public async Task<InvoiceDetailDTO> CreateAsync(InvoiceDetailCreateDTO dto)
    {
        var entity = new InvoiceDetail
        {
            InvoiceId = dto.InvoiceId,
            ItemType = dto.ItemType,
            ItemId = dto.ItemId,
            Description = dto.Description,
            Quantity = dto.Quantity,
            UnitPrice = dto.UnitPrice,
            TotalPrice = dto.Quantity * dto.UnitPrice
        };

        await _repo.AddAsync(entity);
        return ToDTO(entity);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var entity = await _repo.GetByIdAsync(id);
        if (entity == null) return false;

        await _repo.DeleteAsync(entity);
        return true;
    }

    private InvoiceDetailDTO ToDTO(InvoiceDetail entity)
    {
        return new InvoiceDetailDTO
        {
            Id = entity.Id,
            InvoiceId = entity.InvoiceId,
            ItemType = entity.ItemType,
            ItemId = entity.ItemId,
            Description = entity.Description,
            Quantity = entity.Quantity,
            UnitPrice = entity.UnitPrice,
            TotalPrice = entity.TotalPrice
        };
    }
}

}