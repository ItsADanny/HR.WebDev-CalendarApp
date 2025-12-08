public interface IEventService
{
    IEnumerable<Event> GetAll();
    Event? GetByID(int id);
    IEnumerable<Event> GetByMonth();
    IEnumerable<Event> GetByMonth(int month);
    Event Create(EventDto eventDto);
    Event? Update(int id, EventDto eventDto);
    bool Delete(int id);
}

public class EventService : IEventService
{
    private readonly IRepository<Event> _eventRepo;
    private readonly IRepository<RoomBooking> _roomBookingRepo;
    private readonly IRepository<User> _userRepo;

    public EventService(IRepository<Event> repository, IRepository<RoomBooking> roombookingrepository, IRepository<User> userRepository)
    {
        _eventRepo = repository;
        _roomBookingRepo = roombookingrepository;
        _userRepo = userRepository;
    }

    public Event Create(EventDto eventDto)
    {
        RoomBooking? roomBooking = null;
        if (eventDto.roomBookingID.HasValue)
        {
            roomBooking = _roomBookingRepo.GetByID(eventDto.roomBookingID.Value);
        }
        User? createdByUser = _userRepo.GetByID(eventDto.userID);

        Event newEvent = new Event
        {
            Title = eventDto.title,
            Description = eventDto.description,
            RoomBooking = roomBooking,
            fromDateTime = eventDto.startDateTime,
            untilDateTime = eventDto.endDateTime,
            CreatedByUser = createdByUser,
            CreateDateTime = DateTime.Now
        };

        _eventRepo.Add(newEvent);
        _eventRepo.SaveChanges();
        return newEvent;
    }

    public bool Delete(int id)
    {
        Event? foundEvent = _eventRepo.GetByID(id);
        if (foundEvent == null) return false;

        _eventRepo.Delete(foundEvent);
        _eventRepo.SaveChanges();
        return true;
    }

    public IEnumerable<Event> GetAll() => _eventRepo.ReadAll();

    public Event? GetByID(int id) => _eventRepo.GetByID(id);

    public IEnumerable<Event> GetByMonth() => _eventRepo.GetBy(p => p.fromDateTime.Month == DateTime.Now.Month);
    public IEnumerable<Event> GetByMonth(int month) => _eventRepo.GetBy(p => p.fromDateTime.Month == month);

    public Event? Update(int id, EventDto eventDto)
    {
        Event? foundEvent = _eventRepo.GetByID(id);
        if (foundEvent == null) return null;

        RoomBooking? roomBooking = null;
        if (eventDto.roomBookingID.HasValue)
        {
            roomBooking = _roomBookingRepo.GetByID(eventDto.roomBookingID.Value);
        }

        foundEvent.Title = eventDto.title;
        foundEvent.Description = eventDto.description;
        foundEvent.RoomBooking = roomBooking;
        foundEvent.fromDateTime = eventDto.startDateTime;
        foundEvent.untilDateTime = eventDto.endDateTime;
        foundEvent.UpdateDateTime = DateTime.Now;

        _eventRepo.Update(foundEvent);
        _eventRepo.SaveChanges();

        return foundEvent;
    }
}