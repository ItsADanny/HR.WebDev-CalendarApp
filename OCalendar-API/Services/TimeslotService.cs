public interface ITimeslotService
{
    IEnumerable<Timeslot> GetAll();
    Timeslot? GetByID(int id);
    IEnumerable<Timeslot> GetByRoom(int roomID);
    IEnumerable<Timeslot> GetByDate(DateOnly date);
    IEnumerable<Timeslot> GetByName(string search);
    Timeslot Create(TimeslotDto TimeslotDto);
    Timeslot? Update(int id, TimeslotDto TimeslotDto);
    bool Delete(int id);
}

public class TimeslotService : ITimeslotService
{
    private readonly IRepository<Timeslot> _timeslotRepo;

    public TimeslotService(IRepository<Timeslot> repository)
    {
        _timeslotRepo = repository;
    }

    public Timeslot Create(TimeslotDto TimeslotDto)
    {
        Timeslot newTimeslot = new Timeslot
        {
            RoomID = TimeslotDto.roomID,
            Name = TimeslotDto.name,
            StartTime = TimeslotDto.startTime,
            EndTime = TimeslotDto.endTime,
            Date = TimeslotDto.date,
            CreatedByUserID = TimeslotDto.userID
        };

        _timeslotRepo.Add(newTimeslot);
        _timeslotRepo.SaveChanges();
        return newTimeslot;
    }

    public bool Delete(int id)
    {
        Timeslot? foundTimeslot = _timeslotRepo.GetByID(id);
        if (foundTimeslot == null) return false;

        _timeslotRepo.Delete(foundTimeslot);
        _timeslotRepo.SaveChanges();
        return true;
    }

    public IEnumerable<Timeslot> GetAll() => _timeslotRepo.ReadAll();

    public IEnumerable<Timeslot> GetByDate(DateOnly date) => _timeslotRepo.GetBy(p => p.Date == date);

    public Timeslot? GetByID(int id) => _timeslotRepo.GetByID(id);

    public IEnumerable<Timeslot> GetByName(string search) => _timeslotRepo.GetBy(p => p.Name.Contains(search));

    public IEnumerable<Timeslot> GetByRoom(int roomID) => _timeslotRepo.GetBy(p => p.RoomID == roomID);

    public Timeslot? Update(int id, TimeslotDto TimeslotDto)
    {
        Timeslot? foundTimeslot = _timeslotRepo.GetByID(id);
        if (foundTimeslot == null) return null;

        foundTimeslot.RoomID = TimeslotDto.roomID;
        foundTimeslot.Name = TimeslotDto.name;
        foundTimeslot.StartTime = TimeslotDto.startTime;
        foundTimeslot.EndTime = TimeslotDto.endTime;
        foundTimeslot.Date = TimeslotDto.date;
        foundTimeslot.UpdatedByUserID = TimeslotDto.userID;

        _timeslotRepo.Update(foundTimeslot);
        _timeslotRepo.SaveChanges();

        return foundTimeslot;
    }
}