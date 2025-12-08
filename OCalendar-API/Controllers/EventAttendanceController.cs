using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class EventAttendanceController : ControllerBase
{
    private readonly IEventAttendanceService _eventAttendanceService;

    public EventAttendanceController(IEventAttendanceService eventAttendanceService)
    {
        _eventAttendanceService = eventAttendanceService;
    }

    // ====================================================================================
    // GET
    // ====================================================================================
    [HttpGet("{id:int}")]
    public ActionResult<EventAttendance> GetByID(int id)
    {
        EventAttendance? foundEventAttendance = _eventAttendanceService.GetByID(id);
        if (foundEventAttendance == null) return NotFound();
        return Ok(foundEventAttendance);
    }

    [HttpGet("event/{eventID:int}")]
    public ActionResult<IEnumerable<EventAttendance>> GetByEvent(int eventID)
    {
        IEnumerable<EventAttendance>? foundEventAttendances = _eventAttendanceService.GetByEvent(eventID);
        if (foundEventAttendances == null) return NotFound();
        return Ok(foundEventAttendances);
    }

    [HttpGet("user/{userID:int}")]
    public ActionResult<IEnumerable<EventAttendance>> GetByUser(int userID)
    {
        IEnumerable<EventAttendance>? foundEventAttendances = _eventAttendanceService.GetByUser(userID);
        if (foundEventAttendances == null) return NotFound();
        return Ok(foundEventAttendances);
    }

    // ====================================================================================
    // POST
    // ====================================================================================
    [HttpPost("")]
    public ActionResult<EventAttendance> Create([FromBody] EventAttendingDto ea)
    {
        return Ok(_eventAttendanceService.Create(ea));
    }

    // ====================================================================================
    // PUT
    // ====================================================================================
    [HttpPut("{id:int}")]
    public ActionResult<EventAttendance> Update(int id, [FromBody] EventAttendingDto ea)
    {
        EventAttendance? eventAttendanceSucces = _eventAttendanceService.Update(id, ea);
        return eventAttendanceSucces == null ? NotFound() : Ok(eventAttendanceSucces);
    }
}