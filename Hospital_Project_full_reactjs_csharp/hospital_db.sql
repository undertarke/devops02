
CREATE TABLE [dbo].[Permissions] (
    [Id] int IDENTITY PRIMARY KEY,
    [Name] nvarchar(MAX),
    [Code] nvarchar(MAX),
    [Description] nvarchar(MAX)
);
 

CREATE TABLE [dbo].[Roles] (
    [Id] int IDENTITY PRIMARY KEY,
    [Name] nvarchar(MAX),
    [Description] nvarchar(MAX)
);
 

CREATE TABLE [dbo].[Users] (
    [Id] int IDENTITY PRIMARY KEY,
    [Username] nvarchar(MAX),
    [PasswordHash] nvarchar(MAX),
    [Token] nvarchar(MAX),
    [TokenExpired] datetime2(7),
    [FullName] nvarchar(MAX),
    [Email] nvarchar(MAX),
    [Phone] nvarchar(MAX),
    [Gender] nvarchar(MAX),
    [DateOfBirth] datetime2(7),
    [CreatedAt] datetime2(7),
    [ResetToken] nvarchar(MAX),
    [ResetTokenExpired] datetime2(7),
    [AvatarUrl] nvarchar(MAX),
    [Status] nvarchar(MAX),
    [Address] nvarchar(MAX) DEFAULT (N'')
);
 

CREATE TABLE [dbo].[Branches] (
    [Id] int IDENTITY PRIMARY KEY,
    [Name] nvarchar(MAX),
    [Address] nvarchar(MAX),
    [Phone] nvarchar(MAX)
);
 

CREATE TABLE [dbo].[MedicineSuppliers] (
    [SupplierId] int IDENTITY PRIMARY KEY,
    [SupplierName] nvarchar(MAX),
    [Phone] nvarchar(MAX),
    [Address] nvarchar(MAX)
);
 

CREATE TABLE [dbo].[Medicines] (
    [Id] int IDENTITY PRIMARY KEY,
    [Name] nvarchar(MAX),
    [Type] nvarchar(MAX),
    [SupplierId] int,
    [Code] nvarchar(MAX) DEFAULT (N''),
    [ExpiryDate] datetime2(7) DEFAULT ('0001-01-01T00:00:00.0000000'),
    CONSTRAINT [FK_Medicines_MedicineSuppliers_SupplierId] FOREIGN KEY ([SupplierId]) REFERENCES [dbo].[MedicineSuppliers]([SupplierId])
);
 

CREATE TABLE [dbo].[Rooms] (
    [Id] int IDENTITY PRIMARY KEY,
    [Name] nvarchar(MAX),
    [Description] nvarchar(MAX)
);
 

CREATE TABLE [dbo].[Doctors] (
    [Id] int IDENTITY PRIMARY KEY,
    [UserId] int,
    [Specialization] nvarchar(MAX),
    [Degree] nvarchar(MAX),
    [YearOfExperience] int,
    [BranchId] int DEFAULT ((1)),
    CONSTRAINT [FK_Doctors_Branches_BranchId] FOREIGN KEY ([BranchId]) REFERENCES [dbo].[Branches]([Id]),
    CONSTRAINT [FK_Doctors_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id])
);
 

CREATE TABLE [dbo].[Patients] (
    [Id] int IDENTITY PRIMARY KEY,
    [UserId] int,
    [InsuranceCode] nvarchar(MAX),
    [Address] nvarchar(MAX),
    [EmergencyContact] nvarchar(MAX),
    CONSTRAINT [FK_Patients_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id])
);
 

CREATE TABLE [dbo].[DoctorSchedules] (
    [Id] int IDENTITY PRIMARY KEY,
    [DoctorId] int,
    [RoomId] int,
    [StartTime] time(7),
    [EndTime] time(7),
    [Note] nvarchar(MAX),
    [Date] datetime2(7) DEFAULT ('0001-01-01T00:00:00.0000000'),
    [Status] nvarchar(MAX),
    CONSTRAINT [FK_DoctorSchedules_Doctors_DoctorId] FOREIGN KEY ([DoctorId]) REFERENCES [dbo].[Doctors]([Id]),
    CONSTRAINT [FK_DoctorSchedules_Rooms_RoomId] FOREIGN KEY ([RoomId]) REFERENCES [dbo].[Rooms]([Id])
);
 

CREATE TABLE [dbo].[Appointments] (
    [Id] int IDENTITY PRIMARY KEY,
    [PatientId] int,
    [DoctorId] int,
    [BranchId] int,
    [AppointmentDate] datetime2(7),
    [StartTime] time(7),
    [EndTime] time(7),
    [Status] nvarchar(MAX),
    [Note] nvarchar(MAX),
    [AppointmentNo] nvarchar(MAX) DEFAULT (N''),
    CONSTRAINT [FK_Appointments_Doctors_DoctorId] FOREIGN KEY ([DoctorId]) REFERENCES [dbo].[Doctors]([Id]),
    CONSTRAINT [FK_Appointments_Branches_BranchId] FOREIGN KEY ([BranchId]) REFERENCES [dbo].[Branches]([Id]),
    CONSTRAINT [FK_Appointments_Patients_PatientId] FOREIGN KEY ([PatientId]) REFERENCES [dbo].[Patients]([Id])
);
 

CREATE TABLE [dbo].[Invoices] (
    [Id] int IDENTITY PRIMARY KEY,
    [AppointmentId] int,
    [PatientId] int,
    [IssuedDate] datetime2(7),
    [TotalAmount] decimal(18,2),
    [Status] nvarchar(MAX),
    [Note] nvarchar(MAX),
    [CreatedAt] datetime2(7),
    CONSTRAINT [FK_Invoices_Patients_PatientId] FOREIGN KEY ([PatientId]) REFERENCES [dbo].[Patients]([Id]),
    CONSTRAINT [FK_Invoices_Appointments_AppointmentId] FOREIGN KEY ([AppointmentId]) REFERENCES [dbo].[Appointments]([Id])
);
 

CREATE TABLE [dbo].[InvoiceDetails] (
    [Id] int IDENTITY PRIMARY KEY,
    [InvoiceId] int,
    [ItemType] nvarchar(MAX),
    [ItemId] int,
    [Description] nvarchar(MAX),
    [Quantity] int,
    [UnitPrice] decimal(18,2),
    [TotalPrice] decimal(18,2),
    CONSTRAINT [FK_InvoiceDetails_Invoices_InvoiceId] FOREIGN KEY ([InvoiceId]) REFERENCES [dbo].[Invoices]([Id])
);
 

CREATE TABLE [dbo].[Payments] (
    [Id] int IDENTITY PRIMARY KEY,
    [InvoiceId] int,
    [Amount] decimal(18,2),
    [PaymentDate] datetime2(7),
    [PaymentMethod] nvarchar(MAX),
    [TransactionCode] nvarchar(MAX),
    CONSTRAINT [FK_Payments_Invoices_InvoiceId] FOREIGN KEY ([InvoiceId]) REFERENCES [dbo].[Invoices]([Id])
);
 

CREATE TABLE [dbo].[MedicalRecords] (
    [Id] int IDENTITY PRIMARY KEY,
    [AppointmentID] int,
    [Diagnosis] nvarchar(MAX),
    [Conclusion] nvarchar(MAX),
    [CreatedAt] datetime2(7),
    CONSTRAINT [FK_MedicalRecords_Appointments_AppointmentID] FOREIGN KEY ([AppointmentID]) REFERENCES [dbo].[Appointments]([Id])
);
 

CREATE TABLE [dbo].[Prescriptions] (
    [Id] int IDENTITY PRIMARY KEY,
    [MedicalRecordID] int,
    [PrescribedBy] nvarchar(MAX),
    [CreatedAt] datetime2(7),
    CONSTRAINT [FK_Prescriptions_MedicalRecords_MedicalRecordID] FOREIGN KEY ([MedicalRecordID]) REFERENCES [dbo].[MedicalRecords]([Id])
);
 

CREATE TABLE [dbo].[PrescriptionDetails] (
    [Id] int IDENTITY PRIMARY KEY,
    [PrescriptionID] int,
    [MedicineID] int,
    [Dosage] nvarchar(MAX),
    [Quantity] float,
    [Instructions] nvarchar(MAX),
    CONSTRAINT [FK_PrescriptionDetails_Medicines_MedicineID] FOREIGN KEY ([MedicineID]) REFERENCES [dbo].[Medicines]([Id]),
    CONSTRAINT [FK_PrescriptionDetails_Prescriptions_PrescriptionID] FOREIGN KEY ([PrescriptionID]) REFERENCES [dbo].[Prescriptions]([Id])
);
 

CREATE TABLE [dbo].[LabTests] (
    [LabTestId] int IDENTITY PRIMARY KEY,
    [LabTestName] nvarchar(MAX),
    [LabTestDescription] nvarchar(MAX),
    [LabTestPrice] decimal(18,2)
);
 

CREATE TABLE [dbo].[TestRequests] (
    [Id] int IDENTITY PRIMARY KEY,
    [MedicalRecordID] int,
    [LabTestID] int,
    [RequestedAt] datetime2(7),
    CONSTRAINT [FK_TestRequests_MedicalRecords_MedicalRecordID] FOREIGN KEY ([MedicalRecordID]) REFERENCES [dbo].[MedicalRecords]([Id]),
    CONSTRAINT [FK_TestRequests_LabTests_LabTestID] FOREIGN KEY ([LabTestID]) REFERENCES [dbo].[LabTests]([LabTestId])
);
 

CREATE TABLE [dbo].[TestResults] (
    [Id] int IDENTITY PRIMARY KEY,
    [TestRequestID] int,
    [Result] nvarchar(MAX),
    [ResultDate] datetime2(7),
    CONSTRAINT [FK_TestResults_TestRequests_TestRequestID] FOREIGN KEY ([TestRequestID]) REFERENCES [dbo].[TestRequests]([Id])
);
 

CREATE TABLE [dbo].[MedicalPackages] (
    [Id] int IDENTITY PRIMARY KEY,
    [Name] nvarchar(MAX),
    [Price] decimal(18,2),
    [IsRecommended] bit
);
 

CREATE TABLE [dbo].[MedicalPackageItems] (
    [Id] int IDENTITY PRIMARY KEY,
    [PackageId] int,
    [ItemType] nvarchar(MAX),
    [ItemId] int,
    CONSTRAINT [FK_MedicalPackageItems_MedicalPackages_PackageId] FOREIGN KEY ([PackageId]) REFERENCES [dbo].[MedicalPackages]([Id])
);
 

CREATE TABLE [dbo].[Inventories] (
    [Id] int IDENTITY PRIMARY KEY,
    [MedicineID] int,
    [Stock] int,
    [LastUpdated] datetime2(7),
    CONSTRAINT [FK_Inventories_Medicines_MedicineID] FOREIGN KEY ([MedicineID]) REFERENCES [dbo].[Medicines]([Id])
);
 

CREATE TABLE [dbo].[Blogs] (
    [Id] int IDENTITY PRIMARY KEY,
    [Title] nvarchar(MAX),
    [Content] nvarchar(MAX),
    [FeaturedImage] nvarchar(MAX),
    [Cate ry] nvarchar(MAX),
    [Status] nvarchar(MAX),
    [CreatedAt] datetime2(7),
    [UpdatedAt] datetime2(7),
    [AuthorId] int,
    [Excerpt] nvarchar(MAX),
    [Slug] nvarchar(MAX) DEFAULT (N''),
    CONSTRAINT [FK_Blogs_Users_AuthorId] FOREIGN KEY ([AuthorId]) REFERENCES [dbo].[Users]([Id])
);
 

CREATE TABLE [dbo].[BlogImages] (
    [Id] int IDENTITY PRIMARY KEY,
    [BlogId] int,
    [ImageUrl] nvarchar(500),
    [IsFeatured] bit,
    [Caption] nvarchar(200),
    [DisplayOrder] int,
    [CreatedAt] datetime2(7),
    CONSTRAINT [FK_BlogImages_Blogs_BlogId] FOREIGN KEY ([BlogId]) REFERENCES [dbo].[Blogs]([Id])
);
 

CREATE TABLE [dbo].[Images] (
    [Id] int IDENTITY PRIMARY KEY,
    [FileName] nvarchar(MAX),
    [FilePath] nvarchar(MAX),
    [FileType] nvarchar(MAX),
    [FileSize] bigint,
    [UploadDate] datetime2(7),
    [Description] nvarchar(MAX),
    [BlogId] int,
    [DoctorId] int,
    [IsActive] bit DEFAULT (CONVERT([bit],(0))),
    [Module] nvarchar(MAX),
    [ReferenceId] int,
    [UploadedBy] nvarchar(MAX),
    [UserId] int,
    CONSTRAINT [FK_Images_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id]),
    CONSTRAINT [FK_Images_Blogs_BlogId] FOREIGN KEY ([BlogId]) REFERENCES [dbo].[Blogs]([Id]),
    CONSTRAINT [FK_Images_Doctors_DoctorId] FOREIGN KEY ([DoctorId]) REFERENCES [dbo].[Doctors]([Id])
);
 

CREATE TABLE [dbo].[RolePermissions] (
    [RoleId] int,
    [PermissionId] int,
    CONSTRAINT [FK_RolePermissions_Permissions_PermissionId] FOREIGN KEY ([PermissionId]) REFERENCES [dbo].[Permissions]([Id]),
    CONSTRAINT [FK_RolePermissions_Roles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Roles]([Id]),
    PRIMARY KEY ([RoleId],[PermissionId])
);
 

CREATE TABLE [dbo].[UserRoles] (
    [UserId] int,
    [RoleId] int,
    CONSTRAINT [FK_UserRoles_Roles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Roles]([Id]),
    CONSTRAINT [FK_UserRoles_Users_UserId] FOREIGN KEY ([UserId]) REFERENCES [dbo].[Users]([Id]),
    PRIMARY KEY ([UserId],[RoleId])
);
 

CREATE TABLE [dbo].[WaitingLists] (
    [Id] int IDENTITY PRIMARY KEY,
    [AppointmentID] int,
    [QueueNumber] int,
    [Status] nvarchar(MAX),
    CONSTRAINT [FK_WaitingLists_Appointments_AppointmentID] FOREIGN KEY ([AppointmentID]) REFERENCES [dbo].[Appointments]([Id])
);
 

CREATE TABLE [dbo].[RevenueReports] (
    [Id] int IDENTITY PRIMARY KEY,
    [FromDate] datetime2(7),
    [ToDate] datetime2(7),
    [BranchId] int,
    [TotalAppointments] int,
    [TotalInvoices] int,
    [PaidInvoices] int,
    [TotalRevenue] decimal(18,2),
    [Note] nvarchar(MAX),
    CONSTRAINT [FK_RevenueReports_Branches_BranchId] FOREIGN KEY ([BranchId]) REFERENCES [dbo].[Branches]([Id])
);
 

CREATE TABLE [dbo].[MedicalServices] (
    [Id] int IDENTITY PRIMARY KEY,
    [Name] nvarchar(MAX),
    [Type] nvarchar(MAX),
    [Price] decimal(18,2),
    [Description] nvarchar(MAX)
);
 

-- 2) INSERT dữ liệu mẫu (sử dụng IDENTITY_INSERT khi bạn chèn Id cố định)
-- Ví dụ INSERT cho Branches
SET IDENTITY_INSERT dbo.Branches ON;
INSERT INTO [dbo].[Branches] ([Id], [Name], [Address], [Phone]) VALUES
(1, N'Chi nhánh trung tâm', N'123 Đường ABC, Quận 1, TP.HCM', N'02812345678'),
(2, N'Chi nhánh Bình Thạnh', N'456 Đường DEF, Quận Bình Thạnh, TP.HCM', N'02887654321');
SET IDENTITY_INSERT dbo.Branches OFF;
 

-- Users (đoạn lớn): bật IDENTITY_INSERT trước khi chèn Id cố định
SET IDENTITY_INSERT dbo.Users ON;
INSERT INTO [dbo].[Users] ([Id], [Username], [PasswordHash], [Token], [TokenExpired], [FullName], [Email], [Phone], [Gender], [DateOfBirth], [CreatedAt], [ResetToken], [ResetTokenExpired], [AvatarUrl], [Status], [Address]) VALUES
(1, N'user1', N'hash1', N'token1', '2026-01-01 13:59:49.1166667', N'User Fullname 1', N'user1@example.com', N'0900000001', N'Male', '1991-05-12 00:00:00.0000000', '2025-09-23 13:59:49.1166667', N'reset_token_1', '2025-10-03 13:59:49.1166667', N'https://example.com/avatar1.jpg', N'Active', N'Address 1'),
(2, N'user2', N'hash2', N'token2', '2026-02-20 13:59:49.1166667', N'User Fullname 2', N'user2@example.com', N'0900000002', N'Female', '1989-07-19 00:00:00.0000000', '2025-09-23 13:59:49.1166667', N'reset_token_2', '2025-10-08 13:59:49.1166667', N'https://example.com/avatar2.jpg', N'Active', N'Address 2'),
(3, N'user3', N'hash3', N'token3', '2026-04-11 13:59:49.1166667', N'User Fullname 3', N'user3@example.com', N'0900000003', N'Male', '1990-08-01 00:00:00.0000000', '2025-09-23 13:59:49.1166667', N'reset_token_3', '2025-09-30 13:59:49.1166667', N'https://example.com/avatar3.jpg', N'Active', N'Address 3'),
(4, N'user4', N'hash4', N'token4', '2026-01-21 13:59:49.1166667', N'User Fullname 4', N'user4@example.com', N'0900000004', N'Female', '1992-04-15 00:00:00.0000000', '2025-09-23 13:59:49.1166667', N'reset_token_4', '2025-10-02 13:59:49.1166667', N'https://example.com/avatar4.jpg', N'Active', N'Address 4'),
(5, N'user5', N'hash5', N'token5', '2026-03-22 13:59:49.1166667', N'User Fullname 5', N'user5@example.com', N'0900000005', N'Male', '1988-12-03 00:00:00.0000000', '2025-09-23 13:59:49.1166667', N'reset_token_5', '2025-09-28 13:59:49.1166667', N'https://example.com/avatar5.jpg', N'Active', N'Address 5'),
(6, N'user6', N'hash6', N'token6', '2025-12-22 13:59:49.1166667', N'User Fullname 6', N'user6@example.com', N'0900000006', N'Male', '1993-03-22 00:00:00.0000000', '2025-09-23 13:59:49.1166667', N'reset_token_6', '2025-10-05 13:59:49.1166667', N'https://example.com/avatar6.jpg', N'Active', N'Address 6'),
(7, N'user7', N'hash7', N'token7', '2025-12-02 13:59:49.1166667', N'User Fullname 7', N'user7@example.com', N'0900000007', N'Female', '1991-06-17 00:00:00.0000000', '2025-09-23 13:59:49.1166667', N'reset_token_7', '2025-10-01 13:59:49.1166667', N'https://example.com/avatar7.jpg', N'Active', N'Address 7'),
(8, N'user8', N'hash8', N'token8', '2026-01-11 13:59:49.1166667', N'User Fullname 8', N'user8@example.com', N'0900000008', N'Other', '1987-10-20 00:00:00.0000000', '2025-09-23 13:59:49.1166667', N'reset_token_8', '2025-10-04 13:59:49.1166667', N'https://example.com/avatar8.jpg', N'Active', N'Address 8'),
(9, N'user9', N'hash9', N'token9', '2025-11-22 13:59:49.1166667', N'User Fullname 9', N'user9@example.com', N'0900000009', N'Male', '1994-02-05 00:00:00.0000000', '2025-09-23 13:59:49.1166667', N'reset_token_9', '2025-09-29 13:59:49.1166667', N'https://example.com/avatar9.jpg', N'Active', N'Address 9'),
(10, N'user10', N'hash10', N'token10', '2026-07-20 13:59:49.1166667', N'User Fullname 10', N'user10@example.com', N'0900000010', N'Female', '1986-09-09 00:00:00.0000000', '2025-09-23 13:59:49.1166667', N'reset_token_10', '2025-09-27 13:59:49.1166667', N'https://example.com/avatar10.jpg', N'Active', N'Address 10'),
(11, N'string', N'$2a$11$uaR5pstzxBYHVYgtUTXzjOvWbOO0c0WbMkfRwGUsh1o9XuvX8sVAW', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxMSIsInVuaXF1ZV9uYW1lIjoic3RyaW5nIiwiRnVsbE5hbWUiOiJOZ3V5ZW4gU2FuZyIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTc1ODYxODQ3OSwiZXhwIjoxNzU4NjI5Mjc5LCJpYXQiOjE3NTg2MTg0NzksImlzcyI6Ikhvc3BpdGFsQVBJIiwiYXVkIjoiSG9zcGl0YWxDbGllbnQifQ.yA9I2rPmJGFjOlJqMNuONOrtLU1Qxgk4vHzvt_Tw4to', '2025-09-23 12:07:59.2244407', N'Nguyen Sang', N'sangrom2003@gmail.com', N'0906935483', N'Male', '2025-09-04 00:00:00.0000000', '2025-09-23 07:05:54.2180360', NULL, NULL, NULL, N'Active', N''),
(12, N'hikari', N'$2a$11$Q39K/rsFHfOOh1LtWmZozuxplOR/s5NAPQUEPZ1EeyQuDIuNqdf26', N'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxMiIsInVuaXF1ZV9uYW1lIjoiaGlrYXJpIiwiRnVsbE5hbWUiOiJoaWthcmkiLCJyb2xlIjoiUGF0aWVudCIsIm5iZiI6MTc1ODY4MDcwNiwiZXhwIjoxNzU4NjkxNTA2LCJpYXQiOjE3NTg2ODA3MDYsImlzcyI6Ikhvc3BpdGFsQVBJIiwiYXVkIjoiSG9zcGl0YWxDbGllbnQifQ.03R880mExm4owNXPcnPWfOACyPFbf9uhtHoMc4NDvNk', '2025-09-24 05:25:06.9769187', N'hikari', N'hikari@gmail.com', N'0825658956', N'Male', '2000-12-05 00:00:00.0000000', '2025-09-23 15:14:24.4534977', NULL, NULL, NULL, N'Active', N'');
SET IDENTITY_INSERT dbo.Users OFF;
 

-- Roles
SET IDENTITY_INSERT dbo.Roles ON;
INSERT INTO dbo.Roles ([Id],[Name],[Description]) VALUES
(1, N'Admin', N'Quản trị hệ thống với toàn quyền'),
(2, N'Doctor', N'Bác sĩ - có quyền truy cập hồ sơ bệnh nhân, lịch hẹn, kê toa'),
(3, N'Patient', N'Bệnh nhân - có thể đặt lịch hẹn, xem hồ sơ cá nhân'),
(4, N'Nurse', N'Y tá - hỗ trợ bác sĩ, quản lý lịch hẹn và bệnh án'),
(5, N'Cashier', N'Nhân viên thu ngân - xử lý thanh toán và hóa đơn'),
(6, N'Pharmacist', N'Dược sĩ - quản lý thuốc và đơn thuốc'),
(7, N'Receptionist', N'Lễ tân - đặt lịch hẹn và quản lý danh sách chờ');
SET IDENTITY_INSERT dbo.Roles OFF;
 

-- UserRoles
INSERT INTO dbo.UserRoles ([UserId],[RoleId]) VALUES
(11, 1),
(12, 3);
 

-- Doctors
SET IDENTITY_INSERT dbo.Doctors ON;
INSERT INTO dbo.Doctors ([Id], [UserId], [Specialization], [Degree], [YearOfExperience], [BranchId]) VALUES
(3, 6, N'Neurology', N'MD', 6, 1),
(4, 7, N'Neurology', N'PhD', 13, 1),
(5, 8, N'Cardiology', N'PhD', 19, 1),
(6, 9, N'Cardiology', N'MD', 11, 1),
(7, 10, N'Cardiology', N'PhD', 14, 1);
SET IDENTITY_INSERT dbo.Doctors OFF;
 

-- Patients
SET IDENTITY_INSERT dbo.Patients ON;
INSERT INTO dbo.Patients ([Id], [UserId], [InsuranceCode], [Address], [EmergencyContact]) VALUES
(1, 1, N'INS001', N'Address 1', N'0912000001'),
(2, 2, N'INS002', N'Address 2', N'0912000002'),
(3, 3, N'INS003', N'Address 3', N'0912000003'),
(4, 4, N'INS004', N'Address 4', N'0912000004'),
(5, 5, N'INS005', N'Address 5', N'0912000005'),
(6, 11, N'', N'', N''),
(7, 12, N'', N'', N'');
SET IDENTITY_INSERT dbo.Patients OFF;
 