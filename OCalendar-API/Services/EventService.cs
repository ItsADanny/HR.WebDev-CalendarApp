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

    public EventService(IRepository<Event> repository)
    {
        _eventRepo = repository;
    }

    public Event Create(EventDto eventDto)
    {
        Event newEvent = new Event
        {
            Title = eventDto.title,
            Description = eventDto.description,
            RoomBookingID = eventDto.roomBookingID,
            fromDateTime = eventDto.startDateTime,
            untilDateTime = eventDto.endDateTime,
            CreatedByUserID = eventDto.userID
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

        foundEvent.Title = eventDto.title;
        foundEvent.Description = eventDto.description;
        foundEvent.RoomBookingID = eventDto.roomBookingID;
        foundEvent.fromDateTime = eventDto.startDateTime;
        foundEvent.untilDateTime = eventDto.endDateTime;

        _eventRepo.Update(foundEvent);
        _eventRepo.SaveChanges();

        return foundEvent;
    }
}