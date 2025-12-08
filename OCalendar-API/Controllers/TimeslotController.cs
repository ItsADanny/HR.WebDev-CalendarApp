using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class TimeslotController : ControllerBase
{
    private readonly ITimeslotService _TimeslotService;

    public TimeslotController(ITimeslotService timeslotService)
    {
        _TimeslotService = timeslotService;
    }

    // ====================================================================================
    // GET
    // ====================================================================================
    [HttpGet("")]
    public ActionResult<IEnumerable<Timeslot>> GetAll() => Ok(_TimeslotService.GetAll());

    [HttpGet("{id:int}")]
    public ActionResult<EventAttendance> GetByID(int id)
    {
        Timeslot? foundTimeslot = _TimeslotService.GetByID(id);
        if (foundTimeslot == null) return NotFound();
        return Ok(foundTimeslot);
    }

    [HttpGet("room/{roomId:int}")]
    public ActionResult<IEnumerable<Timeslot>> GetByRoom(int roomId)
    {
        IEnumerable<Timeslot>? foundTimeslot = _TimeslotService.GetByRoom(roomId);
        if (foundTimeslot == null) return NotFound();
        return Ok(foundTimeslot);
    }

    [HttpGet("date/{search:alpha}")]
    public ActionResult<IEnumerable<Timeslot>> GetByDate(string search)
    {
        IEnumerable<Timeslot>? foundTimeslot = _TimeslotService.GetByDate(DateOnly.FromDateTime(DateTime.Now));
        if (foundTimeslot == null) return NotFound();
        return Ok(foundTimeslot);
    }

    [HttpGet("name/{search:alpha}")]
    public ActionResult<IEnumerable<Timeslot>> GetByName(string search)
    {
        IEnumerable<Timeslot>? foundTimeslot = _TimeslotService.GetByName(search);
        if (foundTimeslot == null) return NotFound();
        return Ok(foundTimeslot);
    }

    // ====================================================================================
    // POST
    // ====================================================================================
    [HttpPost("")]
    public ActionResult<Timeslot> Create([FromBody] TimeslotDto ts)
    {
        return Ok(_TimeslotService.Create(ts));
    }

    // ====================================================================================
    // PUT
    // ====================================================================================
    [HttpPut("{id:int}")]
    public ActionResult<Timeslot> Update(int id, [FromBody] TimeslotDto ts)
    {
        Timeslot? timeslotSucces = _TimeslotService.Update(id, ts);
        return timeslotSucces == null ? NotFound() : Ok(timeslotSucces);
    }

    // ====================================================================================
    // DELETE
    // ====================================================================================
    [HttpDelete("{id:int}")]
    public ActionResult<Timeslot> Delete(int id) => _TimeslotService.Delete(id) ? NotFound() : Ok();
}