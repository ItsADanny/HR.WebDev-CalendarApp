using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
[ServiceFilter(typeof(LoginFilter))]
public class RoomController : ControllerBase
{
    private readonly IRoomService _roomService;

    public RoomController(IRoomService roomService)
    {
        _roomService = roomService;
    }

    // Room Create(RoomDto roomDto);
    // Room? Update(int id, RoomDto roomDto);
    // bool Delete(int id);

    // ====================================================================================
    // GET
    // ====================================================================================
    [HttpGet("")]
    public ActionResult<IEnumerable<Room>> GetAll()
    {
        return Ok(_roomService.GetAll());
    }

    [HttpGet("{id:int}")]
    public ActionResult<Room> GetByID(int id)
    {
        Room? foundRoom = _roomService.GetByID(id);
        if (foundRoom == null) return NotFound();
        return Ok(foundRoom);
    }

    [HttpGet("location/{id:int}")]
    public ActionResult<Room> GetByLocation(int id)
    {
        IEnumerable<Room>? foundRooms = _roomService.GetByLocation(id);
        if (foundRooms == null) return NotFound();
        return Ok(foundRooms);
    }

    [HttpGet("active")]
    public ActionResult<Room> GetActive()
    {
        IEnumerable<Room>? foundRooms = _roomService.GetActive();
        if (foundRooms == null) return NotFound();
        return Ok(foundRooms);
    }

    [HttpGet("inactive")]
    public ActionResult<Room> GetInActive()
    {
        IEnumerable<Room>? foundRooms = _roomService.GetInActive();
        if (foundRooms == null) return NotFound();
        return Ok(foundRooms);
    }

    [HttpGet("active/{option:bool}")]
    public ActionResult<Room> GetActiveBool(bool option)
    {
        IEnumerable<Room>? foundRooms;
        
        if (option)
        {
            foundRooms = _roomService.GetActive();
        }
        else
        {
            foundRooms = _roomService.GetInActive();
        }
        
        if (foundRooms == null) return NotFound();
        return Ok(foundRooms);
    }

    [HttpGet("inactive/{option:bool}")]
    public ActionResult<Room> GetInActiveBool(bool option)
    {
        IEnumerable<Room>? foundRooms;

        if (option)
        {
            foundRooms = _roomService.GetInActive();
        }
        else
        {
            foundRooms = _roomService.GetActive();
        }

        if (foundRooms == null) return NotFound();
        return Ok(foundRooms);
    }

    // ====================================================================================
    // POST
    // ====================================================================================
    [TypeFilter(typeof(CanManageFilter), Arguments = new object[] { eManageOptions.ManageRooms })]
    [HttpPost("")]
    public ActionResult<Room> Create([FromBody] RoomDto R)
    {
        return Ok(_roomService.Create(R));
    }

    // ====================================================================================
    // PUT
    // ====================================================================================
    [TypeFilter(typeof(CanManageFilter), Arguments = new object[] { eManageOptions.ManageRooms })]
    [HttpPut("{id:int}")]
    public ActionResult<Room> Update(int id, [FromBody] RoomDto R)
    {
        Room? eventSucces = _roomService.Update(id, R);
        return eventSucces == null ? NotFound() : Ok(eventSucces);
    }

    // ====================================================================================
    // DELETE
    // ====================================================================================
    [TypeFilter(typeof(CanManageFilter), Arguments = new object[] { eManageOptions.ManageRooms })]
    [HttpDelete("{id:int}")]
    public ActionResult<Room> Delete(int id) => _roomService.Delete(id) ? NotFound() : Ok();
}