using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

//Add the scope for the Repository
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

//Add the AppContext (Database)
builder.Services.AddDbContext<AppContext>(options =>
    options.UseSqlite("Data source=local.db"));

// Add the controllers
builder.Services.AddControllers();
//Add the EndpointsApiExplorer and SwaggerGen
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add the services
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddScoped<IEventAttendanceService, EventAttendanceService>();
builder.Services.AddScoped<IEventCommentService, EventCommentService>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<IRoomService, RoomService>();
builder.Services.AddScoped<IRoomBookingService, RoomBookingService>();
builder.Services.AddScoped<ITimeslotService, TimeslotService>();

//Wordt door Ryan gedaan
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ILocationService, LocationService>();

var app = builder.Build();

// Define application URL
app.Urls.Add("http://localhost:5050");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    //This will generate a OpenAPI yaml document 
    //when the application is run in DEV mode
    app.MapOpenApi("/openapi/{documentName}.yaml");

    app.UseSwagger();
    app.UseSwaggerUI(options => // UseSwaggerUI is called only in Development.
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty;
    });
}

//Map the Swagger
app.MapSwagger();
//Map the Controllers
app.MapControllers();

app.UseHttpsRedirection();
app.Run();

//Records
public record EventDto(string title, string description, int? roomBookingID, DateTime startDateTime, DateTime endDateTime, int userID);
public record EventAttendingDto(int userID, int eventID, bool attending);
public record EventCommentDto(int eventID, int userID, string comment);
public record RoleDto(string name, int allowedManageRooms, int allowedManageTimeslots, int allowedManageUsers, int allowedManageEvents, int userID);
public record RoomDto(string name, int locationId, bool active, int userID);
public record RoomBookingDto(int roomID, int timeslotID, int userID);
public record TimeslotDto(int roomID, string name, TimeOnly startTime, TimeOnly endTime, DateOnly date, int userID);
public record UserDto(string email, string password, string firstName, string lastName, int roleID);
public record LocationDto(string name, int houseNumber, string houseNumberAdditive, string street, string city, double lon, double lat, int userID);
