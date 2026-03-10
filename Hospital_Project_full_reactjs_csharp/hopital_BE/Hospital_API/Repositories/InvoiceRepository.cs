using Hospital_API.Data;
using Hospital_API.DTOs;
using Hospital_API.Interfaces;
using Hospital_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Repositories
{
    public class InvoiceRepository : IInvoiceRepository
    {
        private readonly HospitalDbContext _context;

        public InvoiceRepository(HospitalDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Invoice>> GetAllAsync()
        {
            return await _context.Invoices.Include(i => i.Appointment).ToListAsync();
        }

        public async Task<Invoice?> GetByIdAsync(int id)
        {
            return await _context.Invoices.Include(i => i.Appointment)
                                          .FirstOrDefaultAsync(i => i.Id == id);
        }
        public async Task<List<Invoice>> GetInvoicesByPatientIdAsync(int patientId)
        {
            return await _context.Invoices
                .Include(i => i.InvoiceDetails)
                .Include(i => i.Payments)
                .Where(i => i.PatientId == patientId)
                .ToListAsync();
        }
        public async Task<Invoice?> GetByAppointmentIdAsync(int appointmentId)
        {
            return await _context.Invoices.FirstOrDefaultAsync(i => i.AppointmentId == appointmentId);
        }

        public async Task AddAsync(Invoice invoice)
        {
            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Invoice invoice)
        {
            _context.Invoices.Update(invoice);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Invoice invoice)
        {
            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();
        }
        public async Task<int> CreateWithDetailsAsync(InvoiceCreateDTO dto)
        {
            var invoice = new Invoice
            {
                AppointmentId = dto.AppointmentId,
                PatientId = dto.PatientId,
                TotalAmount = dto.TotalAmount,
                Status = dto.Status,
                Note = dto.Note,
                IssuedDate = DateTime.Now
            };

            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync(); // Lúc này invoice.Id có giá trị

            foreach (var item in dto.InvoiceDetails)
            {
                var detail = new InvoiceDetail
                {
                    InvoiceId = invoice.Id,
                    ItemType = item.ItemType,
                    ItemId = item.ItemId,
                    Description = item.Description,
                    Quantity = item.Quantity,
                    UnitPrice = item.UnitPrice,
                    TotalPrice = item.Quantity * item.UnitPrice
                };

                _context.InvoiceDetails.Add(detail);
            }

            await _context.SaveChangesAsync();
            return invoice.Id;
        }
    }

}