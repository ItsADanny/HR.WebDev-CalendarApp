public interface IEventAttendanceService
{
    IEnumerable<EventAttendance> GetByEvent(int eventID);
    EventAttendance? GetByID(int id);
    IEnumerable<EventAttendance> GetByUser(int userID);
    EventAttendance Create(EventAttendingDto eventAttendingDto);
    EventAttendance? Update(int id, EventAttendingDto eventAttendingDto);
}

public class EventAttendanceService : IEventAttendanceService
{
    private readonly IRepository<EventAttendance> _eventAttendanceRepo;
    private readonly IRepository<User> _userRepo;
    private readonly IRepository<Event> _eventRepo; 

    public EventAttendanceService(IRepository<EventAttendance> repository, IRepository<User> userRepository, IRepository<Event> eventRepository)
    {
        _eventAttendanceRepo = repository;
        _userRepo = userRepository;
        _eventRepo = eventRepository;
    }

    public EventAttendance Create(EventAttendingDto eventAttendingDto)
    {
        Event? foundEvent = _eventRepo.GetByID(eventAttendingDto.eventID);
        User? foundUser = _userRepo.GetByID(eventAttendingDto.userID);

        EventAttendance newEventAttendance = new EventAttendance
        {
            User = foundUser,
            Event = foundEvent,
            Attending = eventAttendingDto.attending
        };

        _eventAttendanceRepo.Add(newEventAttendance);
        _eventAttendanceRepo.SaveChanges();
        return newEventAttendance;
    }

    public IEnumerable<EventAttendance> GetByEvent(int eventID) => _eventAttendanceRepo.GetBy(ea => ea.Event == _eventRepo.GetByID(eventID));

    public EventAttendance? GetByID(int id) => _eventAttendanceRepo.GetByID(id);

    public IEnumerable<EventAttendance> GetByUser(int userID) => _eventAttendanceRepo.GetBy(ea => ea.User == _userRepo.GetByID(userID));

    public EventAttendance? Update(int id, EventAttendingDto eventAttendingDto)
    {
        EventAttendance? foundEventAttendance = _eventAttendanceRepo.GetByID(id);
        if (foundEventAttendance == null) return null;

        foundEventAttendance.Attending = eventAttendingDto.attending;

        _eventAttendanceRepo.Update(foundEventAttendance);
        _eventAttendanceRepo.SaveChanges();

        return foundEventAttendance;
    }
}