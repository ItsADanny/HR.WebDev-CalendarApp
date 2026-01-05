public interface IEventAttendanceService
{
    IEnumerable<EventAttendance> GetByEvent(int eventID);
    EventAttendance? GetByID(int id);
    IEnumerable<EventAttendance> GetByUser(int userID);
    IEnumerable<EventAttendance> GetByMonthForUser(int year, int month, int userID);
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
            Attending = eventAttendingDto.attending,
            CreateDateTime = DateTime.Now
        };

        _eventAttendanceRepo.Add(newEventAttendance);
        _eventAttendanceRepo.SaveChanges();
        return newEventAttendance;
    }

    public IEnumerable<EventAttendance> GetByEvent(int eventID) => _eventAttendanceRepo.GetBy(ea => ea.Event == _eventRepo.GetByID(eventID));

    public IEnumerable<EventAttendance> GetByMonthForUser(int year, int month, int userID) {
        DateTime searchDateTime = new DateTime(year, month, 1);
        IEnumerable<Event> foundEvents = _eventRepo.GetBy(e => e.fromDateTime.Month == searchDateTime.Month && e.fromDateTime.Year == searchDateTime.Year);
        IEnumerable<EventAttendance> foundEventAttendances = [];
        foreach(Event foundEvent in foundEvents)
        {
            IEnumerable<EventAttendance> results = _eventAttendanceRepo.GetBy(ea => ea.EventId == foundEvent.Id && ea.UserId == userID);
            foundEventAttendances = foundEventAttendances.Concat(results);
        }

        return foundEventAttendances;
    }

    public EventAttendance? GetByID(int id) => _eventAttendanceRepo.GetByID(id);

    public IEnumerable<EventAttendance> GetByUser(int userID) => _eventAttendanceRepo.GetBy(ea => ea.User == _userRepo.GetByID(userID));

    public EventAttendance? Update(int id, EventAttendingDto eventAttendingDto)
    {
        EventAttendance? foundEventAttendance = _eventAttendanceRepo.GetByID(id);
        if (foundEventAttendance == null) return null;

        foundEventAttendance.Attending = eventAttendingDto.attending;
        foundEventAttendance.UpdateDateTime = DateTime.Now;

        _eventAttendanceRepo.Update(foundEventAttendance);
        _eventAttendanceRepo.SaveChanges();

        return foundEventAttendance;
    }
}