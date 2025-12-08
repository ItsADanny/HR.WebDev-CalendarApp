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

    public EventCommentService(IRepository<EventComment> repository)
    {
        _eventCommentRepo = repository;
    }

    public EventComment Create(EventCommentDto eventCommentDto)
    {
        EventComment newCommentEvent = new EventComment
        {
            EventID = eventCommentDto.eventID,
            UserID = eventCommentDto.userID,
            Comment = eventCommentDto.comment
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

    public IEnumerable<EventComment> GetByEvent(int eventID) => _eventCommentRepo.GetBy(p => p.EventID == eventID);

    public EventComment? GetByID(int id) => _eventCommentRepo.GetByID(id);

    public IEnumerable<EventComment> GetBySearch(string search) => _eventCommentRepo.GetBy(p => p.Comment.Contains(search));

    public EventComment? Update(int id, EventCommentDto eventCommentDto)
    {
        EventComment? foundEventComment = _eventCommentRepo.GetByID(id);
        if (foundEventComment == null) return null;

        foundEventComment.Comment = eventCommentDto.comment;

        _eventCommentRepo.Update(foundEventComment);
        _eventCommentRepo.SaveChanges();

        return foundEventComment;
    }
}