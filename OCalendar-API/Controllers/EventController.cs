using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
[ServiceFilter(typeof(LoginFilter))]
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

    [HttpGet("current")]
    public ActionResult<IEnumerable<Event>> GetByCurrentMonthYear()
    {
        IEnumerable<Event>? foundEvents = _eventService.GetByMonthAndYear();
        if (foundEvents == null) return NotFound();
        return Ok(foundEvents);
    }

    [HttpGet("{year:int}/{month:int}")]
    public ActionResult<IEnumerable<Event>> GetByMonth(int year, int month)
    {
        IEnumerable<Event>? foundEvents = _eventService.GetByMonthAndYear(month, year);
        if (foundEvents == null) return NotFound();
        return Ok(foundEvents);
    }

    // ====================================================================================
    // POST
    // ====================================================================================
    [TypeFilter(typeof(CanManageFilter), Arguments = new object[] { eManageOptions.ManageEvents })]
    [HttpPost("")]
    public ActionResult<Event> Create([FromBody] EventDto e)
    {
        return Ok(_eventService.Create(e));
    }

    // ====================================================================================
    // PUT
    // ====================================================================================
    [TypeFilter(typeof(CanManageFilter), Arguments = new object[] { eManageOptions.ManageEvents })]
    [HttpPut("{id:int}")]
    public ActionResult<Event> Update(int id, [FromBody] EventDto e)
    {
        Event? eventSucces = _eventService.Update(id, e);
        return eventSucces == null ? NotFound() : Ok(eventSucces);
    }

    // ====================================================================================
    // DELETE
    // ====================================================================================
    [TypeFilter(typeof(CanManageFilter), Arguments = new object[] { eManageOptions.ManageEvents })]
    [HttpDelete("{id:int}")]
    public ActionResult<Event> Delete(int id) => _eventService.Delete(id) ? Ok() : NotFound();
}
