using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class RoleController : ControllerBase
{
    private readonly IRoleService _roleService;

    public RoleController(IRoleService roleService)
    {
        _roleService = roleService;
    }

    // ====================================================================================
    // GET
    // ====================================================================================
    [HttpGet("")]
    public ActionResult<IEnumerable<Role>> GetAll()
    {
        return Ok(_roleService.GetAll());
    }

    [HttpGet("{id:int}")]
    public ActionResult<Role> GetByID(int id)
    {
        Role? foundRole = _roleService.GetByID(id);
        if (foundRole == null) return NotFound();
        return Ok(foundRole);
    }

    [HttpGet("search/{search:alpha}")]
    public ActionResult<IEnumerable<Event>> GetByName(string search)
    {
        IEnumerable<Role>? foundRoles = _roleService.GetByName(search);
        if (foundRoles == null) return NotFound();
        return Ok(foundRoles);
    }

    [HttpGet("user/{userId:int}")]
    public ActionResult<Role> GetByUserId(int userId)
    {
        Role? foundRole = _roleService.GetByUserId(userId);
        if (foundRole == null) return NotFound();
        return Ok(foundRole);
    }

    // ====================================================================================
    // POST
    // ====================================================================================
    [HttpPost("")]
    public ActionResult<Role> Create([FromBody] RoleDto R)
    {
        return Ok(_roleService.Create(R));
    }

    // ====================================================================================
    // PUT
    // ====================================================================================
    [HttpPut("{id:int}")]
    public ActionResult<Role> Update(int id, [FromBody] RoleDto R)
    {
        Role? roleSucces = _roleService.Update(id, R);
        return roleSucces == null ? NotFound() : Ok(roleSucces);
    }

    // ====================================================================================
    // DELETE
    // ====================================================================================
    [HttpDelete("{id:int}")]
    public ActionResult<Event> Delete(int id) => _roleService.Delete(id) ? NotFound() : Ok();
}