using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OCalendar_API.Migrations
{
    /// <inheritdoc />
    public partial class addedLinkedFieldToSaltAndRoomBooking : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoomBookings_Rooms_RoomId",
                table: "RoomBookings");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomBookings_timeslots_TimeslotId",
                table: "RoomBookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_locations_LocationId",
                table: "Rooms");

            migrationBuilder.DropForeignKey(
                name: "FK_Salts_Users_UserId",
                table: "Salts");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Salts",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "LocationId",
                table: "Rooms",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "TimeslotId",
                table: "RoomBookings",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "RoomId",
                table: "RoomBookings",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomBookings_Rooms_RoomId",
                table: "RoomBookings",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RoomBookings_timeslots_TimeslotId",
                table: "RoomBookings",
                column: "TimeslotId",
                principalTable: "timeslots",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_locations_LocationId",
                table: "Rooms",
                column: "LocationId",
                principalTable: "locations",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Salts_Users_UserId",
                table: "Salts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoomBookings_Rooms_RoomId",
                table: "RoomBookings");

            migrationBuilder.DropForeignKey(
                name: "FK_RoomBookings_timeslots_TimeslotId",
                table: "RoomBookings");

            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_locations_LocationId",
                table: "Rooms");

            migrationBuilder.DropForeignKey(
                name: "FK_Salts_Users_UserId",
                table: "Salts");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Salts",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "LocationId",
                table: "Rooms",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TimeslotId",
                table: "RoomBookings",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "RoomId",
                table: "RoomBookings",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_RoomBookings_Rooms_RoomId",
                table: "RoomBookings",
                column: "RoomId",
                principalTable: "Rooms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RoomBookings_timeslots_TimeslotId",
                table: "RoomBookings",
                column: "TimeslotId",
                principalTable: "timeslots",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_locations_LocationId",
                table: "Rooms",
                column: "LocationId",
                principalTable: "locations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Salts_Users_UserId",
                table: "Salts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
