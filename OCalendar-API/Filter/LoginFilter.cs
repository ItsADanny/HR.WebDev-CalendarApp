using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

public class LoginFilter : IAuthorizationFilter{

    private IAuthService _authService;

    public LoginFilter(IAuthService authService)
    {
        _authService = authService;
    }

    public void OnAuthorization(AuthorizationFilterContext context) {
        string? token = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault();

        if (token is not null)
        {
            UserSession? foundSession = _authService.SessionExists(token);
            if (foundSession is null) context.Result = new UnauthorizedResult();
        }
        else
        {
            context.Result = new UnauthorizedResult();
        }
    }
}