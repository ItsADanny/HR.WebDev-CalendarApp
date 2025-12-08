using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class RoomBookingController : ControllerBase
{
    private readonly IRoomBookingService _RoomBookingService;

    public RoomBookingController(IRoomBookingService roomBookingService)
    {
        _RoomBookingService = roomBookingService;
    }

    // ====================================================================================
    // GET
    // ====================================================================================
    [HttpGet("")]
    public ActionResult<IEnumerable<Timeslot>> GetAll() => Ok(_RoomBookingService.GetAll());

    [HttpGet("{id:int}")]
    public ActionResult<EventAttendance> GetByID(int id)
    {
        RoomBooking? foundRoomBooking = _RoomBookingService.GetByID(id);
        if (foundRoomBooking == null) return NotFound();
        return Ok(foundRoomBooking);
    }

    [HttpGet("room/{roomId:int}")]
    public ActionResult<IEnumerable<Timeslot>> GetByRoom(int roomId)
    {
        IEnumerable<RoomBooking>? foundTimeslot = _RoomBookingService.GetByRoom(roomId);
        if (foundTimeslot == null) return NotFound();
        return Ok(foundTimeslot);
    }

    [HttpGet("timeslot/{timeslotId:int}")]
    public ActionResult<IEnumerable<Timeslot>> GetByDate(int timeslotId)
    {
        IEnumerable<RoomBooking>? foundTimeslot = _RoomBookingService.GetByTimeslot(timeslotId);
        if (foundTimeslot == null) return NotFound();
        return Ok(foundTimeslot);
    }

    [HttpGet("user/{userId:int}")]
    public ActionResult<IEnumerable<Timeslot>> GetByName(int userId)
    {
        IEnumerable<RoomBooking>? foundRoomBooking = _RoomBookingService.GetByUser(userId);
        if (foundRoomBooking == null) return NotFound();
        return Ok(foundRoomBooking);
    }

    // ====================================================================================
    // POST
    // ====================================================================================
    [HttpPost("")]
    public ActionResult<Timeslot> Create([FromBody] RoomBookingDto rb)
    {
        return Ok(_RoomBookingService.Create(rb));
    }

    // ====================================================================================
    // PUT
    // ====================================================================================
    [HttpPut("{id:int}")]
    public ActionResult<Timeslot> Update(int id, [FromBody] RoomBookingDto rb)
    {
        RoomBooking? roomBookingSucces = _RoomBookingService.Update(id, rb);
        return roomBookingSucces == null ? NotFound() : Ok(roomBookingSucces);
    }

    // ====================================================================================
    // DELETE
    // ====================================================================================
    [HttpDelete("{id:int}")]
    public ActionResult<Timeslot> Delete(int id) => _RoomBookingService.Delete(id) ? NotFound() : Ok();
}