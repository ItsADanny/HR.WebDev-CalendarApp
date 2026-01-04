using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

public class CanManageFilter : IAuthorizationFilter{
    
    private IAuthService _authService;
    private IUserService _userService;
    private IRoleService _roleService;
    private eManageOptions _filterOption;
    
    public CanManageFilter(IAuthService authService, IUserService userService, IRoleService roleService, eManageOptions filterOption)
    {
        _authService = authService;
        _userService = userService;
        _roleService = roleService;
        _filterOption = filterOption;
    }

    public void OnAuthorization(AuthorizationFilterContext context) {
        string? token = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault();

        if (token is not null)
        {
            UserSession? foundSession = _authService.SessionExists(token);
            if (foundSession is null) context.Result = new UnauthorizedResult();

            User? foundUser = _userService.GetByID((int) foundSession.UserId);
            if (foundUser is null) context.Result = new UnauthorizedResult();

            Role? foundRole = _roleService.GetByID((int) foundUser.RoleId);
            if (foundRole is null) context.Result = new UnauthorizedResult();

            switch (_filterOption)
            {
                case eManageOptions.ManageEvents:
                    if (foundRole.AllowedManageEvents == 0) context.Result = new UnauthorizedResult();
                    break;
                case eManageOptions.ManageRooms:
                    if (foundRole.AllowedManageRooms == 0) context.Result = new UnauthorizedResult();
                    break;
                case eManageOptions.ManageTimeslots:
                    if (foundRole.AllowedManageTimeslots == 0) context.Result = new UnauthorizedResult();
                    break;
                case eManageOptions.ManageUsers:
                    if (foundRole.AllowedManageUsers == 0) context.Result = new UnauthorizedResult();
                    break;
                default:
                    context.Result = new UnauthorizedResult();
                    break;
            }
        }
        else
        {
            context.Result = new UnauthorizedResult();
        }
    }
}