using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    // ====================================================================================
    // GET
    // ====================================================================================
    [ServiceFilter(typeof(LoginFilter))]
    [HttpGet("")]
    public ActionResult<IEnumerable<User>> GetAll() {
        IEnumerable<User>? foundUsers = _userService.GetAll();

        foreach (User user in foundUsers)
        {
            user.Password = "";
        }

        return Ok(foundUsers);
    }

    [ServiceFilter(typeof(LoginFilter))]
    [HttpGet("{id:int}")]
    public ActionResult<User> GetByID(int id)
    {
        User? foundUser = _userService.GetByID(id);
        if (foundUser == null) return NotFound();

        //Set the password field to empty when returning
        foundUser.Password = "";

        return Ok(foundUser);
    }

    [ServiceFilter(typeof(LoginFilter))]
    [HttpGet("role/{roleId:int}")]
    public ActionResult<IEnumerable<User>> GetByMonth(int roleId)
    {
        IEnumerable<User>? foundUsers = _userService.GetByRoleID(roleId);
        if (foundUsers == null) return NotFound();

        //Set the password field to empty when returning
        // foreach (User user in foundUsers)
        // {
        //     user.Password = "";
        // }

        return Ok(foundUsers);
    }

    [ServiceFilter(typeof(LoginFilter))]
    [HttpGet("email/{email:alpha}")]
    public ActionResult<IEnumerable<User>> GetByMonth(string email)
    {
        IEnumerable<User>? foundUsers = _userService.GetByEmail(email);
        if (foundUsers == null) return NotFound();

        //Set the password field to empty when returning
        // foreach (User user in foundUsers)
        // {
        //     user.Password = "";
        // }

        return Ok(foundUsers);
    }

    [ServiceFilter(typeof(LoginFilter))]
    [HttpGet("firstname/{firstname:alpha}")]
    public ActionResult<IEnumerable<User>> GetByFirstname(string firstname)
    {
        IEnumerable<User>? foundUsers = _userService.GetByEmail(firstname);
        if (foundUsers == null) return NotFound();

        //Set the password field to empty when returning
        // foreach (User user in foundUsers)
        // {
        //     user.Password = "";
        // }

        return Ok(foundUsers);
    }

    [ServiceFilter(typeof(LoginFilter))]
    [HttpGet("lastname/{lastname:alpha}")]
    public ActionResult<IEnumerable<User>> GetByLastname(string lastname)
    {
        IEnumerable<User>? foundUsers = _userService.GetByEmail(lastname);
        if (foundUsers == null) return NotFound();

        //Set the password field to empty when returning
        // foreach (User user in foundUsers)
        // {
        //     user.Password = "";
        // }

        return Ok(foundUsers);
    }

    // ====================================================================================
    // POST
    // ====================================================================================
    [HttpPost("")]
    public ActionResult<Event> Create([FromBody] UserDto u)
    {
        IEnumerable<User> foundUser = _userService.GetByEmail(u.email);

        if (foundUser.Count() == 0)
        {
            return Ok(_userService.Create(u));
        }
        return Conflict("User with email already exists");
    }

    // ====================================================================================
    // PUT
    // ====================================================================================
    [ServiceFilter(typeof(LoginFilter))]
    [HttpPut("{id:int}")]
    public ActionResult<Event> Update(int id, [FromBody] UserDto u)
    {
        User? userSucces = _userService.Update(id, u);
        return userSucces == null ? NotFound() : Ok(userSucces);
    }

    // ====================================================================================
    // DELETE
    // ====================================================================================
    [TypeFilter(typeof(CanManageFilter), Arguments = new object[] { eManageOptions.ManageUsers })]
    [ServiceFilter(typeof(LoginFilter))]
    [HttpDelete("{id:int}")]
    public ActionResult<Event> Delete(int id) => _userService.Delete(id) ? Ok() : NotFound();
}