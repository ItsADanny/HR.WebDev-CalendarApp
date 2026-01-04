using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
[ServiceFilter(typeof(LoginFilter))]
public class EventCommentController : ControllerBase
{
    private readonly IEventCommentService _eventCommentService;

    public EventCommentController(IEventCommentService eventCommentService)
    {
        _eventCommentService = eventCommentService;
    }

    // ====================================================================================
    // GET
    // ====================================================================================
    [HttpGet("")]
    public ActionResult<IEnumerable<EventComment>> GetAll() => Ok(_eventCommentService.GetAll());
    
    [HttpGet("{id:int}")]
    public ActionResult<EventComment> GetByID(int id)
    {
        EventComment? foundEventComment = _eventCommentService.GetByID(id);
        if (foundEventComment == null) return NotFound();
        return Ok(foundEventComment);
    }

    [HttpGet("search/{search:alpha}")]
    public ActionResult<IEnumerable<EventComment>> GetByMonth(string search)
    {
        IEnumerable<EventComment>? foundEventComments = _eventCommentService.GetBySearch(search);
        if (foundEventComments == null) return NotFound();
        return Ok(foundEventComments);
    }

    [HttpGet("event/{id:int}")]
    public ActionResult<IEnumerable<EventComment>> GetByEvent(int eventID)
    {
        IEnumerable<EventComment>? foundEventComments = _eventCommentService.GetByEvent(eventID);
        if (foundEventComments == null) return NotFound();
        return Ok(foundEventComments);
    }

    // ====================================================================================
    // POST
    // ====================================================================================
    [HttpPost("")]
    public ActionResult<EventComment> Create([FromBody] EventCommentDto ec)
    {
        return Ok(_eventCommentService.Create(ec));
    }

    // ====================================================================================
    // PUT
    // ====================================================================================
    [HttpPut("{id:int}")]
    public ActionResult<EventComment> Update(int id, [FromBody] EventCommentDto ec)
    {
        EventComment? eventCommentSucces = _eventCommentService.Update(id, ec);
        return eventCommentSucces == null ? NotFound() : Ok(eventCommentSucces);
    }

    // ====================================================================================
    // DELETE
    // ====================================================================================
    [HttpDelete("{id:int}")]
    public ActionResult<EventComment> Delete(int id) => _eventCommentService.Delete(id) ? NotFound() : Ok();
}