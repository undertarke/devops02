using Hospital_API.Models;



using Microsoft.EntityFrameworkCore;

namespace Hospital_API.Data
{
    public class HospitalDbContext : DbContext
    {
        public HospitalDbContext(DbContextOptions<HospitalDbContext> options) : base(options) { }



        // add các Model entity

        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }

        public DbSet<Permission> Permissions { get; set; }
        public DbSet<RolePermission> RolePermissions { get; set; }

        public DbSet<Medicines> Medicines { get; set; }
        public DbSet<MedicineSupplier> MedicineSuppliers { get; set; }
        public DbSet<MedicalServiceDb> MedicalServices { get; set; }
        public DbSet<Branch> Branches { get; set; }
        public DbSet<LabTest> LabTests { get; set; }

        public DbSet<Patient> Patients { get; set; }
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<Invoice> Invoices { get; set; }

        public DbSet<Payment> Payments { get; set; }

        public DbSet<TestRequest> TestRequests { get; set; }
        public DbSet<TestResult> TestResults { get; set; }
        public DbSet<WaitingList> WaitingLists { get; set; }
        public DbSet<PrescriptionDetails> PrescriptionDetails { get; set; }
        public DbSet<Prescriptions> Prescriptions { get; set; }
        public DbSet<Inventory> Inventories { get; set; }
        public DbSet<MedicalRecord> MedicalRecords { get; set; }


        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Room> Rooms { get; set; }

        public DbSet<InvoiceDetail> InvoiceDetails { get; set; }

        public DbSet<DoctorSchedule> DoctorSchedules { get; set; }
        public DbSet<RevenueReport> RevenueReports { get; set; }
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<BlogImage> BlogImages { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<MedicalPackageDb> MedicalPackages { get; set; }
        public DbSet<MedicalPackageItemDb> MedicalPackageItems { get; set; }




        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserRole>()
                .HasKey(ur => new { ur.UserId, ur.RoleId });

            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(ur => ur.UserId);

            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId);

            modelBuilder.Entity<RolePermission>()
            .HasKey(rp => new { rp.RoleId, rp.PermissionId });

            modelBuilder.Entity<RolePermission>()
                .HasOne(rp => rp.Role)
                .WithMany(r => r.RolePermissions)
                .HasForeignKey(rp => rp.RoleId);

            modelBuilder.Entity<RolePermission>()
                .HasOne(rp => rp.Permission)
                .WithMany(p => p.RolePermissions)
                .HasForeignKey(rp => rp.PermissionId);

            modelBuilder.Entity<Patient>()
                .HasOne(p => p.User)
                .WithOne(u => u.Patient)
                .HasForeignKey<Patient>(p => p.UserId);

            modelBuilder.Entity<Doctor>()
                .HasOne(p => p.User)
                .WithOne(u => u.Doctor)
                .HasForeignKey<Doctor>(p => p.UserId);

            modelBuilder.Entity<Doctor>()
                    .HasOne(d => d.Branch)
                    .WithMany(b => b.Doctors)
                    .HasForeignKey(d => d.BranchId)
                    .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Patient)
                .WithMany(p => p.Appointments)
                .HasForeignKey(a => a.PatientId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Doctor)
                .WithMany(d => d.Appointments)
                .HasForeignKey(a => a.DoctorId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Branch)
                .WithMany(b => b.Appointments)
                .HasForeignKey(a => a.BranchId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Invoice>()
                    .HasOne(i => i.Appointment)
                    .WithOne(a => a.Invoice)
                    .HasForeignKey<Invoice>(i => i.AppointmentId)
                    .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Payment>()
                    .HasOne(p => p.Invoice)
                    .WithMany(i => i.Payments)
                    .HasForeignKey(p => p.InvoiceId)
                    .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<Invoice>()
            .HasMany(i => i.InvoiceDetails)
            .WithOne(d => d.Invoice)
            .HasForeignKey(d => d.InvoiceId)
            .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<DoctorSchedule>()
            .HasOne(ds => ds.Doctor)
            .WithMany(d => d.Schedules)
            .HasForeignKey(ds => ds.DoctorId)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<DoctorSchedule>()
            .HasOne(ds => ds.Room)
            .WithMany(r => r.DoctorSchedules)
            .HasForeignKey(ds => ds.RoomId)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<RevenueReport>()
            .HasOne(r => r.Branch)
            .WithMany()
            .HasForeignKey(r => r.BranchId)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Blog>()
                .HasOne(b => b.Author)
                .WithMany()
                .HasForeignKey(b => b.AuthorId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<MedicalPackageItemDb>()
        .HasOne(x => x.MedicalPackage)
        .WithMany(x => x.Items)
        .HasForeignKey(x => x.PackageId)
        .OnDelete(DeleteBehavior.Cascade);
            
             modelBuilder.Entity<MedicalPackageItemDb>()
            .HasKey(x => x.Id);

            // Configure relationships
            modelBuilder.Entity<Prescriptions>()
                .HasOne(p => p.MedicalRecord)
                .WithMany()
                .HasForeignKey(p => p.MedicalRecordID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PrescriptionDetails>()
                .HasOne(pd => pd.Prescription)
                .WithMany(p => p.Details)
                .HasForeignKey(pd => pd.PrescriptionID)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PrescriptionDetails>()
                .HasOne(pd => pd.Medicine)
                .WithMany()
                .HasForeignKey(pd => pd.MedicineID)
                .OnDelete(DeleteBehavior.Restrict);
        }

    }
}
