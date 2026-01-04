using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
[ServiceFilter(typeof(LoginFilter))]
public class RoomBookingController : ControllerBase
{
    private readonly IRoomBookingService _RoomBookingService;
    private readonly IRoomService _roomService;
    private readonly ITimeslotService _timeslotService;

    public RoomBookingController(IRoomBookingService roomBookingService, IRoomService roomService, ITimeslotService timeslotService)
    {
        _RoomBookingService = roomBookingService;
        _roomService = roomService;
        _timeslotService = timeslotService;
    }

    // ====================================================================================
    // GET
    // ====================================================================================
    [HttpGet("")]
    public ActionResult<IEnumerable<RoomBooking>> GetAll() {
        IEnumerable<RoomBooking> bookings = _RoomBookingService.GetAll();

        foreach (RoomBooking booking in bookings)
        {
            booking.Room = _roomService.GetByID((int) booking.RoomId);
            booking.Timeslot = _timeslotService.GetByID((int) booking.TimeslotId);
        }

        return Ok(bookings);
    }

    [HttpGet("{id:int}")]
    public ActionResult<RoomBooking> GetByID(int id)
    {
        RoomBooking? foundRoomBooking = _RoomBookingService.GetByID(id);
        if (foundRoomBooking == null) return NotFound();

        foundRoomBooking.Room = _roomService.GetByID((int) foundRoomBooking.RoomId);
        foundRoomBooking.Timeslot = _timeslotService.GetByID((int) foundRoomBooking.TimeslotId);
        
        return Ok(foundRoomBooking);
    }

    [HttpGet("room/{roomId:int}")]
    public ActionResult<IEnumerable<RoomBooking>> GetByRoom(int roomId)
    {
        IEnumerable<RoomBooking>? foundTimeslot = _RoomBookingService.GetByRoom(roomId);
        if (foundTimeslot == null) return NotFound();

        foreach (RoomBooking booking in foundTimeslot)
        {
            booking.Room = _roomService.GetByID((int) booking.RoomId);
            booking.Timeslot = _timeslotService.GetByID((int) booking.TimeslotId);
        }

        return Ok(foundTimeslot);
    }

    [HttpGet("timeslot/{timeslotId:int}")]
    public ActionResult<IEnumerable<RoomBooking>> GetByDate(int timeslotId)
    {
        IEnumerable<RoomBooking>? foundTimeslot = _RoomBookingService.GetByTimeslot(timeslotId);
        if (foundTimeslot == null) return NotFound();

        foreach (RoomBooking booking in foundTimeslot)
        {
            booking.Room = _roomService.GetByID((int) booking.RoomId);
            booking.Timeslot = _timeslotService.GetByID((int) booking.TimeslotId);
        }

        return Ok(foundTimeslot);
    }

    [HttpGet("user/{userId:int}")]
    public ActionResult<IEnumerable<RoomBooking>> GetByName(int userId)
    {
        IEnumerable<RoomBooking>? foundRoomBooking = _RoomBookingService.GetByUser(userId);
        if (foundRoomBooking == null) return NotFound();

        foreach (RoomBooking booking in foundRoomBooking)
        {
            booking.Room = _roomService.GetByID((int) booking.RoomId);
            booking.Timeslot = _timeslotService.GetByID((int) booking.TimeslotId);
        }

        return Ok(foundRoomBooking);
    }

    // ====================================================================================
    // POST
    // ====================================================================================
    [HttpPost("")]
    public ActionResult<RoomBooking> Create([FromBody] RoomBookingDto rb)
    {
        return Ok(_RoomBookingService.Create(rb));
    }

    // ====================================================================================
    // PUT
    // ====================================================================================
    [HttpPut("{id:int}")]
    public ActionResult<RoomBooking> Update(int id, [FromBody] RoomBookingDto rb)
    {
        RoomBooking? roomBookingSucces = _RoomBookingService.Update(id, rb);
        return roomBookingSucces == null ? NotFound() : Ok(roomBookingSucces);
    }

    // ====================================================================================
    // DELETE
    // ====================================================================================
    [HttpDelete("{id:int}")]
    public ActionResult<RoomBooking> Delete(int id) => _RoomBookingService.Delete(id) ? NotFound() : Ok();
}