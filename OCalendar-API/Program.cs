using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

//Add the scope for the Repository
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

//Add the AppContext (Database)
builder.Services.AddDbContext<AppContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default")));

// Add the controllers
builder.Services.AddControllers();
//Add the EndpointsApiExplorer and SwaggerGen
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS
var frontendUrl = builder.Configuration["Frontend:Url"];
builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
        policy.WithOrigins(frontendUrl!)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials());
});

// Add the services
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddScoped<IEventAttendanceService, EventAttendanceService>();
builder.Services.AddScoped<IEventCommentService, EventCommentService>();
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<IRoomService, RoomService>();
builder.Services.AddScoped<IRoomBookingService, RoomBookingService>();
builder.Services.AddScoped<ITimeslotService, TimeslotService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ILocationService, LocationService>();
builder.Services.AddScoped<IAuthService, AuthService>();

// Add the login filter as a service
builder.Services.AddScoped<LoginFilter>();

var app = builder.Build();

// Use CORS
app.UseCors("FrontendPolicy");

// IMPORTANT: Set URLs from config
var httpUrl = builder.Configuration["BackendUrls:Http"];
if (!string.IsNullOrEmpty(httpUrl))
    app.Urls.Add(httpUrl);

//[DISABLED], Because we use CORS
// Define application URL
// app.Urls.Add("http://localhost:5050");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    //This will generate a OpenAPI yaml document 
    //when the application is run in DEV mode
    app.MapOpenApi("/openapi/{documentName}.yaml");

    app.UseSwagger();
    app.UseSwaggerUI(options => // UseSwaggerUI is called only in Development.
    {
        //[DISABLED], Because after the CORS implementation
        //Because this would result in an error which wouldn't make it possible to display
        //the generated swagger file
        // options.RoutePrefix = string.Empty;
    });
}

//Map the Swagger
app.MapSwagger();
//Map the Controllers
app.MapControllers();

app.UseHttpsRedirection();
app.Run();
