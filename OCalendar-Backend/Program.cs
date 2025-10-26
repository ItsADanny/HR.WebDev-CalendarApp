var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapGet("/Login", () =>
{
    return "Balls";
})
.WithName("GetLogin");

app.MapGet("/Logout", () =>
{
    return "Nigger";
})
.WithName("GetLogout");

app.MapGet("", async () =>
{
    return CEvent.GetEvent();
})
.WithName(GetEvents);

app.MapGet("/Event/{eventID}", async (int eventID) =>
{
    return CEvent.GetEvent(eventID);
})
.WithName("GetSpecificEvent");


app.Run();
