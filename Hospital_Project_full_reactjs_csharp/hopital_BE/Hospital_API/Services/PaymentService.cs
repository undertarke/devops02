using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Hospital_API.Models;

namespace Hospital_API.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IPaymentRepository _repo;

        public PaymentService(IPaymentRepository repo)
        {
            _repo = repo;
        }

        public async Task<IEnumerable<PaymentDTO>> GetAllAsync()
        {
            var list = await _repo.GetAllAsync();
            return list.Select(p => new PaymentDTO
            {
                Id = p.Id,
                InvoiceId = p.InvoiceId,
                Amount = p.Amount,
                PaymentDate = p.PaymentDate,
                PaymentMethod = p.PaymentMethod,
                TransactionCode = p.TransactionCode
            });
        }

        public async Task<PaymentDTO?> GetByIdAsync(int id)
        {
            var p = await _repo.GetByIdAsync(id);
            return p == null ? null : new PaymentDTO
            {
                Id = p.Id,
                InvoiceId = p.InvoiceId,
                Amount = p.Amount,
                PaymentDate = p.PaymentDate,
                PaymentMethod = p.PaymentMethod,
                TransactionCode = p.TransactionCode
            };
        }

        public async Task<IEnumerable<PaymentDTO>> GetByInvoiceIdAsync(int invoiceId)
        {
            var list = await _repo.GetByInvoiceIdAsync(invoiceId);
            return list.Select(p => new PaymentDTO
            {
                Id = p.Id,
                InvoiceId = p.InvoiceId,
                Amount = p.Amount,
                PaymentDate = p.PaymentDate,
                PaymentMethod = p.PaymentMethod,
                TransactionCode = p.TransactionCode
            });
        }

        public async Task<PaymentDTO> CreateAsync(PaymentCreateDTO dto)
        {
            var entity = new Payment
            {
                InvoiceId = dto.InvoiceId,
                Amount = dto.Amount,
                PaymentDate = dto.PaymentDate,
                PaymentMethod = dto.PaymentMethod,
                TransactionCode = dto.TransactionCode
            };

            await _repo.AddAsync(entity);
            return await GetByIdAsync(entity.Id) ?? throw new Exception("Create Failed");
        }

        public async Task<PaymentDTO?> UpdateAsync(PaymentUpdateDTO dto)
        {
            var entity = await _repo.GetByIdAsync(dto.Id);
            if (entity == null) return null;

            entity.Amount = dto.Amount;
            entity.PaymentDate = dto.PaymentDate;
            entity.PaymentMethod = dto.PaymentMethod;
            entity.TransactionCode = dto.TransactionCode;

            await _repo.UpdateAsync(entity);
            return await GetByIdAsync(dto.Id);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _repo.GetByIdAsync(id);
            if (entity == null) return false;

            await _repo.DeleteAsync(entity);
            return true;
        }
    }

}