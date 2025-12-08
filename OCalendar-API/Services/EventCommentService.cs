public interface IEventCommentService
{
    IEnumerable<EventComment> GetAll();
    IEnumerable<EventComment> GetBySearch(string search);
    IEnumerable<EventComment> GetByEvent(int eventID);
    EventComment? GetByID(int id);
    EventComment Create(EventCommentDto eventCommentDto);
    EventComment? Update(int id, EventCommentDto eventCommentDto);
    bool Delete(int id);
}

public class EventCommentService : IEventCommentService
{
    private readonly IRepository<EventComment> _eventCommentRepo;
    private readonly IRepository<Event> _eventRepo;
    private readonly IRepository<User> _userRepo;

    public EventCommentService(IRepository<EventComment> repository, IRepository<Event> eventRepository, IRepository<User> userRepository)
    {
        _eventCommentRepo = repository;
        _eventRepo = eventRepository;
        _userRepo = userRepository;
    }

    public EventComment Create(EventCommentDto eventCommentDto)
    {
        Event? foundEvent = _eventRepo.GetByID(eventCommentDto.eventID);
        User? foundUser = _userRepo.GetByID(eventCommentDto.userID);

        EventComment newCommentEvent = new EventComment
        {
            Event = foundEvent,
            User = foundUser,
            Comment = eventCommentDto.comment,
            CreateDateTime = DateTime.Now
        };

        _eventCommentRepo.Add(newCommentEvent);
        _eventCommentRepo.SaveChanges();
        return newCommentEvent;
    }

    public bool Delete(int id)
    {
        EventComment? foundEventComment = _eventCommentRepo.GetByID(id);
        if (foundEventComment == null) return false;

        _eventCommentRepo.Delete(foundEventComment);
        _eventCommentRepo.SaveChanges();
        return true;
    }

    public IEnumerable<EventComment> GetAll() => _eventCommentRepo.ReadAll();

    public IEnumerable<EventComment> GetByEvent(int eventID) => _eventCommentRepo.GetBy(p => p.Event == _eventRepo.GetByID(eventID));

    public EventComment? GetByID(int id) => _eventCommentRepo.GetByID(id);

    public IEnumerable<EventComment> GetBySearch(string search) => _eventCommentRepo.GetBy(p => p.Comment.Contains(search));

    public EventComment? Update(int id, EventCommentDto eventCommentDto)
    {
        EventComment? foundEventComment = _eventCommentRepo.GetByID(id);
        if (foundEventComment == null) return null;

        foundEventComment.Comment = eventCommentDto.comment;
        foundEventComment.CreateDateTime = DateTime.Now;

        _eventCommentRepo.Update(foundEventComment);
        _eventCommentRepo.SaveChanges();

        return foundEventComment;
    }
}