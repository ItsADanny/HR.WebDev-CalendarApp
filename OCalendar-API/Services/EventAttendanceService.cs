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

    public EventAttendanceService(IRepository<EventAttendance> repository)
    {
        _eventAttendanceRepo = repository;
    }

    public EventAttendance Create(EventAttendingDto eventAttendingDto)
    {
        EventAttendance newEventAttendance = new EventAttendance
        {
            UserID = eventAttendingDto.userID,
            EventID = eventAttendingDto.eventID,
            Attending = eventAttendingDto.attending
        };

        _eventAttendanceRepo.Add(newEventAttendance);
        _eventAttendanceRepo.SaveChanges();
        return newEventAttendance;
    }

    public IEnumerable<EventAttendance> GetByEvent(int eventID) => _eventAttendanceRepo.GetBy(ea => ea.EventID == eventID);

    public EventAttendance? GetByID(int id) => _eventAttendanceRepo.GetByID(id);

    public IEnumerable<EventAttendance> GetByUser(int userID) => _eventAttendanceRepo.GetBy(ea => ea.UserID == userID);

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