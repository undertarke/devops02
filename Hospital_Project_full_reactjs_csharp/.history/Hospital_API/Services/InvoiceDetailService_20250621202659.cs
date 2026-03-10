using Hospital_API.Data;
using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Hospital_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Services
{
    public class InvoiceDetailService : IInvoiceDetailService
{
    private readonly IInvoiceDetailRepository _repo;
    private readonly HospitalDbContext _context;

    public InvoiceDetailService(IInvoiceDetailRepository repo,HospitalDbContext context )
        {
            _repo = repo;
            _context = context;

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
        await UpdateInvoiceTotal(dto.InvoiceId);

        return ToDTO(entity);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var entity = await _repo.GetByIdAsync(id);
        if (entity == null) return false;

        await _repo.DeleteAsync(entity);
        await UpdateInvoiceTotal(entity.InvoiceId);

        return true;
    }
    public async Task<InvoiceDetailDTO?> UpdateAsync(int id, InvoiceDetailCreateDTO dto)
        {
            var entity = await _repo.GetByIdAsync(id);
            if (entity == null) return null;

            entity.ItemType = dto.ItemType;
            entity.ItemId = dto.ItemId;
            entity.Description = dto.Description;
            entity.Quantity = dto.Quantity;
            entity.UnitPrice = dto.UnitPrice;
            entity.TotalPrice = dto.Quantity * dto.UnitPrice;

            await _repo.UpdateAsync(entity);
            await UpdateInvoiceTotal(entity.InvoiceId); // tự động cập nhật lại tổng tiền

            return ToDTO(entity);
        }

    private async Task UpdateInvoiceTotal(int invoiceId)
        {
            var invoice = await _context.Invoices
                .Include(i => i.InvoiceDetails)
                .FirstOrDefaultAsync(i => i.Id == invoiceId);

            if (invoice != null)
            {
                invoice.TotalAmount = invoice.InvoiceDetails.Sum(d => d.TotalPrice);
                await _context.SaveChangesAsync();

            }
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