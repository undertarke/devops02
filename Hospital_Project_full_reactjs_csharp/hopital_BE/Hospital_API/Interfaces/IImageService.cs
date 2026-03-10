using Hospital_API.DTOs;
using Hospital_API.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital_API.Interfaces
{
    public interface IImageService
    {
        Task<ImageUploadResponse> UploadImage(
            IFormFile file,
            string? description = null,
            string? module = null,
            int? referenceId = null,
            int? blogId = null,
            int? doctorId = null,
            int? userId = null,
            string? uploadedBy = null);
        Task<Image> GetImageById(int id);
        Task<IEnumerable<Image>> GetImagesByModule(string module);
        Task<IEnumerable<Image>> GetImagesByReference(string module, int referenceId);
        Task<bool> DeleteImage(int id);
    }
} 