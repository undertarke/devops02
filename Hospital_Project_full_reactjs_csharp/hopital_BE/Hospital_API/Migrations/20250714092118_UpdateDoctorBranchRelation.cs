using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hospital_API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDoctorBranchRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BranchId",
                table: "Doctors",
                type: "int",
                nullable: false,
                defaultValue: 1);

            migrationBuilder.CreateIndex(
                name: "IX_Doctors_BranchId",
                table: "Doctors",
                column: "BranchId");

            migrationBuilder.AddForeignKey(
                name: "FK_Doctors_Branches_BranchId",
                table: "Doctors",
                column: "BranchId",
                principalTable: "Branches",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Doctors_Branches_BranchId",
                table: "Doctors");

            migrationBuilder.DropIndex(
                name: "IX_Doctors_BranchId",
                table: "Doctors");

            migrationBuilder.DropColumn(
                name: "BranchId",
                table: "Doctors");
        }
    }
}
