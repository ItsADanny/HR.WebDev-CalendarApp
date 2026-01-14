using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OCalendar_API.Migrations
{
    /// <inheritdoc />
    public partial class AddedAdminPanelFieldToRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AllowedInAdminPanel",
                table: "Roles",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AllowedInAdminPanel",
                table: "Roles");
        }
    }
}
