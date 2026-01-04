using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    // ====================================================================================
    // GET
    // ====================================================================================
    [HttpGet("Exist")]
    public ActionResult<UserSession> DoesExist([FromHeader(Name = "Authorization")] string Authorization) {
        UserSession? foundSession = _authService.SessionExists(Authorization);
        if (foundSession is not null) return Ok(foundSession);
        return NotFound();
    }

    // ====================================================================================
    // POST
    // ====================================================================================
    [HttpPost("Login")]
    public ActionResult<UserSession> Login([FromBody] LoginDto loginDto) {
        UserSession? foundSession = _authService.SessionExistsForEmail(loginDto.email);
        if (foundSession is not null) return Conflict("User already has a running session");

        return Ok(_authService.Login(loginDto));
    }

    // ====================================================================================
    // PUT
    // ====================================================================================
    [HttpPut("Logout")]
    public ActionResult<UserSession> Logout([FromHeader(Name = "Authorization")] string Authorization) {
        UserSession? foundSession = _authService.SessionExists(Authorization);
        if (foundSession is not null) return Ok(_authService.Logout(Authorization));
        return NotFound();
    }
}