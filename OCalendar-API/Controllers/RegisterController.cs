using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class RegisterController : ControllerBase
{
    private readonly IUserService _userService;

    public RegisterController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost]
    public IActionResult Register([FromBody] RegisterRequest request)
    {
        // Validate input
        if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            return BadRequest(new { success = false, message = "Email and password are required" });

        try
        {
            // Check if email already exists
            var existingUsers = _userService.GetByEmail(request.Email);
            if (existingUsers.Any())
                return Conflict(new { success = false, message = "Email already taken" });

            // Create new user via UserService
            var userDto = new UserDto(
                request.Email,
                request.Password,
                request.FirstName,
                request.LastName,
                1 // default roleID
            );

            var newUser = _userService.Create(userDto);

            // Return success with user info
            return Ok(new
            {
                success = true,
                message = "User registered successfully",
                data = new { userId = newUser.Id, email = newUser.Email }
            });
        }
        catch (Exception ex)
        {
            // Catch unexpected server errors
            return StatusCode(500, new { success = false, message = "Internal server error: " + ex.Message });
        }
    }
}

// DTO received from frontend
public class RegisterRequest
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
}
