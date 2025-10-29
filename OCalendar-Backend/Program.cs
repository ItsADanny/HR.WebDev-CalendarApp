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

app.MapPost("/Register", (HttpRequest request) =>
{
    return CAccount.Register(request);
})
.WithName("PostRegister");

app.MapPost("/Login", (HttpRequest request) =>
{
    return CAccount.Auth();
})
.WithName("PostLogin");

app.MapGet("/Logout", () =>
{
    return "Logout";
})
.WithName("GetLogout");

app.MapGet("", async () =>
{
    return CEvent.GetEvent();
})
.WithName("GetEvent");

app.MapGet("/Event/{eventID}", async (int eventID) =>
{
    return CEvent.GetEvent(eventID);
})
.WithName("GetSpecificEvent");


app.Run();
