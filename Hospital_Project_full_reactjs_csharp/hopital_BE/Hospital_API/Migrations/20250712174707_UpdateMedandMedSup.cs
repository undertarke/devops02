using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hospital_API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMedandMedSup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Medicines");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Medicines");

            migrationBuilder.RenameColumn(
                name: "Unit",
                table: "Medicines",
                newName: "Type");

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "Medicines",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "ExpiryDate",
                table: "Medicines",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Code",
                table: "Medicines");

            migrationBuilder.DropColumn(
                name: "ExpiryDate",
                table: "Medicines");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Medicines",
                newName: "Unit");

            migrationBuilder.AddColumn<decimal>(
                name: "Price",
                table: "Medicines",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Medicines",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
