using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class EventController : ControllerBase
{
    private readonly IEventService _eventService;

    public EventController(IEventService eventService)
    {
        _eventService = eventService;
    }

    // ====================================================================================
    // GET
    // ====================================================================================
    [HttpGet("")]
    public ActionResult<IEnumerable<Event>> GetAll()
    {
        return Ok(_eventService.GetAll());
    }

    [HttpGet("{id:int}")]
    public ActionResult<Event> GetByID(int id)
    {
        Event? foundEvent = _eventService.GetByID(id);
        if (foundEvent == null) return NotFound();
        return Ok(foundEvent);
    }

    [HttpGet("month")]
    public ActionResult<IEnumerable<Event>> GetByMonth()
    {
        IEnumerable<Event>? foundEvents = _eventService.GetByMonth();
        if (foundEvents == null) return NotFound();
        return Ok(foundEvents);
    }

    [HttpGet("month/{month:int}")]
    public ActionResult<IEnumerable<Event>> GetByMonth(int month)
    {
        IEnumerable<Event>? foundEvents = _eventService.GetByMonth(month);
        if (foundEvents == null) return NotFound();
        return Ok(foundEvents);
    }

    // ====================================================================================
    // POST
    // ====================================================================================
    [HttpPost("")]
    public ActionResult<Event> Create([FromBody] EventDto e)
    {
        return Ok(_eventService.Create(e));
    }

    // ====================================================================================
    // PUT
    // ====================================================================================
    [HttpPut("{id:int}")]
    public ActionResult<Event> Update(int id, [FromBody] EventDto e)
    {
        Event? eventSucces = _eventService.Update(id, e);
        return eventSucces == null ? NotFound() : Ok(eventSucces);
    }

    // ====================================================================================
    // DELETE
    // ====================================================================================
    [HttpDelete("{id:int}")]
    public ActionResult<Event> Delete(int id) => _eventService.Delete(id) ? NotFound() : Ok();
}
