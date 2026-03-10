using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Hospital_API.Data;
using Hospital_API.Filters;
using Hospital_API.Interfaces;
using Hospital_API.Mapping;
using Hospital_API.Repositories;
using Hospital_API.Repositories.Interfaces;
using Hospital_API.Services;
using Hospital_API.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Globalization;
using System.Reflection;
using AutoMapper;

// Set the culture to invariant
CultureInfo.DefaultThreadCurrentCulture = CultureInfo.InvariantCulture;
CultureInfo.DefaultThreadCurrentUICulture = CultureInfo.InvariantCulture;
Thread.CurrentThread.CurrentCulture = CultureInfo.InvariantCulture;
Thread.CurrentThread.CurrentUICulture = CultureInfo.InvariantCulture;

var builder = WebApplication.CreateBuilder(args);

// Thêm AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

// Thêm dịch vụ CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowMyFrontend",
        policyBuilder =>
        {
            //policyBuilder.WithOrigins("http://localhost:5173") // Cổng frontend của bạn
            policyBuilder.AllowAnyOrigin()
                         .AllowAnyHeader()
                         .AllowAnyMethod();
        });
});

// Cấu hình để ứng dụng nhận diện các header được chuyển tiếp từ Nginx
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders =
        ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    // Xóa các proxy mặc định và chỉ tin tưởng proxy từ localhost
    options.KnownProxies.Clear();
    options.KnownNetworks.Clear();
});


// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Configure file upload limits
builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 10 * 1024 * 1024; // 10MB
});

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Hospital API", Version = "v1" });
    
    // Sửa lại đường dẫn file XML
    var xmlPath = Path.Combine(Directory.GetCurrentDirectory(), "docs", "Hospital_API.xml");
    if (File.Exists(xmlPath))
    {
        c.IncludeXmlComments(xmlPath);
    }
    
    // Cấu hình xác thực JWT cho Swagger
    var securityScheme = new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "Nhập token dạng: Bearer {token}",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer", // phải là "bearer"
        BearerFormat = "JWT"
    };

    var securityRequirement = new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Id = "Bearer",
                    Type = ReferenceType.SecurityScheme
                }
            },
            new List<string>()
        }
    };

    c.AddSecurityDefinition("Bearer", securityScheme);
    c.AddSecurityRequirement(securityRequirement);
});
builder.Services.AddOpenApi();


// Add Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    var jwtSettings = builder.Configuration.GetSection("Jwt");
    var key = Encoding.UTF8.GetBytes(jwtSettings["Secret"]);

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = jwtSettings["Issuer"],

        ValidateAudience = true,
        ValidAudience = jwtSettings["Audience"],

        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),

        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };

    options.Events = new JwtBearerEvents
    {
        OnTokenValidated = async context =>
{
    var userRepo = context.HttpContext.RequestServices.GetRequiredService<IUserRepository>();

    var userId = context.Principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out var id))
    {
        context.Fail("Invalid token");
        return;
    }

    var user = await userRepo.GetByIdAsync(id);
    if (user == null)
    {
        context.Fail("User not found");
        return;
    }

    // Lấy token chuỗi trực tiếp từ header
    var rawToken = context.HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");

    if (string.IsNullOrEmpty(rawToken))
    {
        context.Fail("Token is missing");
        return;
    }

    if (user.Token != rawToken || user.TokenExpired < DateTime.UtcNow)
    {
        context.Fail("Token has been revoked or expired");
        return;
    }
}

    };
});

builder.Services.AddAuthorization();

// Thêm cấu hình phục vụ file tĩnh
builder.Services.AddDirectoryBrowser();

//congfig dbContext

builder.Services.AddDbContext<HospitalDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);
//add service Role
builder.Services.AddScoped<IRoleRepository, RoleRepository>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IBlogRepository, BlogRepository>();
builder.Services.AddScoped<IBlogService, BlogService>();
builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<IPermissionRepository, PermissionRepository>();
builder.Services.AddScoped<IPermissionService, PermissionService>();
builder.Services.AddScoped<IRolePermissionRepository, RolePermissionRepository>();
builder.Services.AddScoped<IRolePermissionService, RolePermissionService>();
builder.Services.AddScoped<IUserRoleRepository, UserRoleRepository>();
builder.Services.AddScoped<IUserRoleService, UserRoleService>();

builder.Services.AddScoped<IMedicinesRepository, MedicinesRepository>();
builder.Services.AddScoped<IMedicinesService, MedicinesService>();
builder.Services.AddScoped<IMedicineSupplierRepository, MedicineSupplierRepository>();
builder.Services.AddScoped<IMedicineSupplierService, MedicineSupplierService>();
builder.Services.AddScoped<IMedServiceRepo, MedicalSerRepo>();
builder.Services.AddScoped<IMedServiceService, MedicalServiceService>();
builder.Services.AddScoped<ILabTestRepo, LabTestRepo>();
builder.Services.AddScoped<ILabTestService, LabTestService>();
builder.Services.AddScoped<IBranchRepository, BranchRepository>();
builder.Services.AddScoped<IBranchService, BranchService>();

builder.Services.AddScoped<ITestRequestRepository, TestRequestRepository>();
builder.Services.AddScoped<ITestRequestService, TestRequestService>();
builder.Services.AddScoped<ITestResultRepository, TestResultRepository>();
builder.Services.AddScoped<ITestResultService, TestResultService>();


builder.Services.AddScoped<IPatientRepository, PatientRepository>();
builder.Services.AddScoped<IPatientService, PatientService>();
builder.Services.AddScoped<IAppointmentRepository, AppointmentRepository>();
builder.Services.AddScoped<IAppointmentService, AppointmentService>();
builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();
builder.Services.AddScoped<IPaymentService, PaymentService>();

builder.Services.AddScoped<IDoctorRepository, DoctorRepository>();
builder.Services.AddScoped<IDoctorService, DoctorService>();
builder.Services.AddScoped<IInvoiceDetailService, InvoiceDetailService>();
builder.Services.AddScoped<IInvoiceDetailRepository, InvoiceDetailRepository>();
builder.Services.AddScoped<IDoctorScheduleRepository, DoctorScheduleRepository>();
builder.Services.AddScoped<IDoctorScheduleService, DoctorScheduleService>();
builder.Services.AddScoped<IRoomRepository, RoomRepository>();
builder.Services.AddScoped<IRoomService, RoomService>();


builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddScoped<IEmailService, EmailService>();


builder.Services.AddScoped<IInventoryRepository, InventoryRepository>();
builder.Services.AddScoped<IInventoryService, InventoryService>();

builder.Services.AddScoped<IInvoiceRepository, InvoiceRepository>();
builder.Services.AddScoped<IInvoiceService, InvoiceService>();

builder.Services.AddScoped<IWaitingListRepository, WaitingListRepository>();
builder.Services.AddScoped<IWaitingListService, WaitingListService>();
builder.Services.AddScoped<IMedicalPackageService, MedicalPackageService>();
builder.Services.AddScoped<IMedicalPackageRepository, MedicalPackageRepository>();
builder.Services.AddScoped<IMedicalPackageItemRepository, MedicalPackageItemRepository>();
builder.Services.AddScoped<IMedicalPackageItemService, MedicalPackageItemService>();

builder.Services.AddScoped<IMedicalRecordsService, MedicalRecordsService>();
builder.Services.AddScoped<IMedicalRecordsRepository, MedicalRecordsRepository>();
builder.Services.AddScoped<IPrescriptionsService, PrescriptionsService>();
builder.Services.AddScoped<IPrescriptionsRepository, PrescriptionsRepository>();
builder.Services.AddScoped<IPrescriptionDetailsService, PrescriptionDetailsService>();
builder.Services.AddScoped<IPrescriptionDetailsRepository, PrescriptionDetailsRepository>();


var app = builder.Build();


// Sử dụng middleware để đọc các header được chuyển tiếp
// Phải được gọi trước các middleware khác như UseRouting, UseAuthentication, v.v.
app.UseForwardedHeaders();

// Configure static files
app.UseStaticFiles();

// Configure CORS
app.UseCors("AllowMyFrontend");





// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable Swagger in all environments
app.UseSwagger(c =>
{
    c.PreSerializeFilters.Add((swaggerDoc, httpReq) =>
    {
        var scheme = httpReq.Headers["X-Forwarded-Proto"].FirstOrDefault() ?? httpReq.Scheme;
        var host = httpReq.Headers["X-Forwarded-Host"].FirstOrDefault() ?? httpReq.Host.Value;
        
        swaggerDoc.Servers = new List<OpenApiServer>
        {
            new OpenApiServer { Url = $"{scheme}://{host}" }
        };
    });
});

app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Hospital API V1");
    c.RoutePrefix = "swagger";
});



// Sử dụng CORS - đặt trước UseAuthentication/UseAuthorization
// app.UseCors("AllowMyFrontend"); // Moved to top

// Use Authentication & Authorization
app.UseAuthentication();
app.UseAuthorization();

app.UseHttpsRedirection();
app.MapControllers();

// Thêm sau app.UseRouting()
// app.UseStaticFiles(); // Cho phép truy cập static files // Moved to top

// Tạo thư mục wwwroot/uploads/images nếu chưa tồn tại
var uploadPath = Path.Combine(builder.Environment.WebRootPath ?? "wwwroot", "uploads", "images");
if (!Directory.Exists(uploadPath))
{
    Directory.CreateDirectory(uploadPath);
}


// var summaries = new[]
// {
//     "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
// };

// app.MapGet("/weatherforecast", () =>
// {
//     var forecast =  Enumerable.Range(1, 5).Select(index =>
//         new WeatherForecast
//         (
//             DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
//             Random.Shared.Next(-20, 55),
//             summaries[Random.Shared.Next(summaries.Length)]
//         ))
//         .ToArray();
//     return forecast;
// })
// .WithName("GetWeatherForecast");

app.Run();

// record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
// {
//     public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
// }
