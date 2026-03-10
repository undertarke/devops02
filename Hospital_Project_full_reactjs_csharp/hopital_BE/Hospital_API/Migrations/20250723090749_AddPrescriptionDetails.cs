using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hospital_API.Migrations
{
    /// <inheritdoc />
    public partial class AddPrescriptionDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PrescriptionDetails_Medicines_MedicineID",
                table: "PrescriptionDetails");

            migrationBuilder.AddForeignKey(
                name: "FK_PrescriptionDetails_Medicines_MedicineID",
                table: "PrescriptionDetails",
                column: "MedicineID",
                principalTable: "Medicines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PrescriptionDetails_Medicines_MedicineID",
                table: "PrescriptionDetails");

            migrationBuilder.AddForeignKey(
                name: "FK_PrescriptionDetails_Medicines_MedicineID",
                table: "PrescriptionDetails",
                column: "MedicineID",
                principalTable: "Medicines",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
