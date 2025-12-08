using Microsoft.EntityFrameworkCore;

public class AppContext : DbContext
{
    public DbSet<Event> Events { get; set; }
    public DbSet<EventAttendance> EventAttendances { get; set; }
    public DbSet<EventComment> EventComments { get; set; }
    public DbSet<Room> Rooms { get; set; }
    public DbSet<RoomBooking> RoomBookings { get; set; }
    public DbSet<Salt> Salts { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<Timeslot> timeslots { get; set; }
    public DbSet<Location> locations { get; set; }

    public AppContext(DbContextOptions<AppContext> options) : base(options) { }

    // protected override void OnConfiguring(DbContextOptionsBuilder options)
    // {
    //     base.OnConfiguring(options);
    //     options.UseSqlite("Data source=local.db");
    // }
}