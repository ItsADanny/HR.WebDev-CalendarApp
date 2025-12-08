using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OCalendar_API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EventAttendances",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserID = table.Column<int>(type: "INTEGER", nullable: false),
                    EventID = table.Column<int>(type: "INTEGER", nullable: false),
                    Attending = table.Column<bool>(type: "INTEGER", nullable: false),
                    CreateDateTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdateDateTime = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventAttendances", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EventComments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    EventID = table.Column<int>(type: "INTEGER", nullable: false),
                    UserID = table.Column<int>(type: "INTEGER", nullable: false),
                    Comment = table.Column<string>(type: "TEXT", nullable: false),
                    CreateDateTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdateDateTime = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventComments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    RoomBookingID = table.Column<int>(type: "INTEGER", nullable: true),
                    fromDateTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    untilDateTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CreatedByUserID = table.Column<int>(type: "INTEGER", nullable: false),
                    CreateDateTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdateDateTime = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "locations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    HouseNumber = table.Column<int>(type: "INTEGER", nullable: false),
                    HouseNumberAdditive = table.Column<string>(type: "TEXT", nullable: false),
                    Street = table.Column<string>(type: "TEXT", nullable: false),
                    City = table.Column<string>(type: "TEXT", nullable: false),
                    Lon = table.Column<double>(type: "REAL", nullable: false),
                    Lat = table.Column<double>(type: "REAL", nullable: false),
                    CreatedByUserID = table.Column<int>(type: "INTEGER", nullable: false),
                    UpdatedByUserID = table.Column<int>(type: "INTEGER", nullable: true),
                    CreateDateTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdateDateTime = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_locations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    AllowedManageRooms = table.Column<int>(type: "INTEGER", nullable: false),
                    AllowedManageTimeslots = table.Column<int>(type: "INTEGER", nullable: false),
                    AllowedManageUsers = table.Column<int>(type: "INTEGER", nullable: false),
                    AllowedManageEvents = table.Column<int>(type: "INTEGER", nullable: false),
                    CreatedByUserID = table.Column<int>(type: "INTEGER", nullable: false),
                    UpdatedByUserID = table.Column<int>(type: "INTEGER", nullable: true),
                    CreateDateTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdateDateTime = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RoomBookings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RoomID = table.Column<int>(type: "INTEGER", nullable: false),
                    TimeSlotID = table.Column<int>(type: "INTEGER", nullable: false),
                    BookedByUserID = table.Column<int>(type: "INTEGER", nullable: false),
                    CreateDateTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdateDateTime = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoomBookings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Rooms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    LocationId = table.Column<int>(type: "INTEGER", nullable: false),
                    Active = table.Column<bool>(type: "INTEGER", nullable: false),
                    CreatedByUserID = table.Column<int>(type: "INTEGER", nullable: false),
                    UpdatedByUserID = table.Column<int>(type: "INTEGER", nullable: true),
                    CreateDateTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdateDateTime = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Salts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserID = table.Column<int>(type: "INTEGER", nullable: false),
                    SaltString = table.Column<string>(type: "TEXT", nullable: false),
                    CreateDateTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdateDateTime = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Salts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "timeslots",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RoomID = table.Column<int>(type: "INTEGER", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    StartTime = table.Column<TimeOnly>(type: "TEXT", nullable: false),
                    EndTime = table.Column<TimeOnly>(type: "TEXT", nullable: false),
                    Date = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    CreatedByUserID = table.Column<int>(type: "INTEGER", nullable: false),
                    UpdatedByUserID = table.Column<int>(type: "INTEGER", nullable: true),
                    CreateDateTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdateDateTime = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_timeslots", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false),
                    FirstName = table.Column<string>(type: "TEXT", nullable: false),
                    LastName = table.Column<string>(type: "TEXT", nullable: false),
                    RoleID = table.Column<int>(type: "INTEGER", nullable: false),
                    CreateDateTime = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdateDateTime = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EventAttendances");

            migrationBuilder.DropTable(
                name: "EventComments");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "locations");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "RoomBookings");

            migrationBuilder.DropTable(
                name: "Rooms");

            migrationBuilder.DropTable(
                name: "Salts");

            migrationBuilder.DropTable(
                name: "timeslots");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
