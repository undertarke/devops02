using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hospital_API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateImageEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BlogId",
                table: "Images",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "DoctorId",
                table: "Images",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Images",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Module",
                table: "Images",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ReferenceId",
                table: "Images",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UploadedBy",
                table: "Images",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Images",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Images_BlogId",
                table: "Images",
                column: "BlogId");

            migrationBuilder.CreateIndex(
                name: "IX_Images_DoctorId",
                table: "Images",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_Images_UserId",
                table: "Images",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Blogs_BlogId",
                table: "Images",
                column: "BlogId",
                principalTable: "Blogs",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Doctors_DoctorId",
                table: "Images",
                column: "DoctorId",
                principalTable: "Doctors",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Users_UserId",
                table: "Images",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Images_Blogs_BlogId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_Doctors_DoctorId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_Users_UserId",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Images_BlogId",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Images_DoctorId",
                table: "Images");

            migrationBuilder.DropIndex(
                name: "IX_Images_UserId",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "BlogId",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "DoctorId",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "Module",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "ReferenceId",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "UploadedBy",
                table: "Images");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Images");
        }
    }
}
