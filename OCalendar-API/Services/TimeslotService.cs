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
    private readonly IRepository<Room> _roomRepo;
    private readonly IRepository<User> _userRepo;

    public TimeslotService(IRepository<Timeslot> repository, IRepository<Room> roomRepository, IRepository<User> userRepository)
    {
        _timeslotRepo = repository;
        _roomRepo = roomRepository;
        _userRepo = userRepository;
    }

    public Timeslot Create(TimeslotDto TimeslotDto)
    {
        Room? foundRoom = _roomRepo.GetByID(TimeslotDto.roomID);
        User? foundUser = _userRepo.GetByID(TimeslotDto.userID);

        Timeslot newTimeslot = new Timeslot
        {
            Room = foundRoom,
            Name = TimeslotDto.name,
            StartTime = TimeslotDto.startTime,
            EndTime = TimeslotDto.endTime,
            Date = TimeslotDto.date,
            CreatedByUser = foundUser
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

    public IEnumerable<Timeslot> GetByRoom(int roomID) => _timeslotRepo.GetBy(p => p.Room == _roomRepo.GetByID(roomID));

    public Timeslot? Update(int id, TimeslotDto TimeslotDto)
    {
        Timeslot? foundTimeslot = _timeslotRepo.GetByID(id);
        if (foundTimeslot == null) return null;

        Room? foundRoom = _roomRepo.GetByID(TimeslotDto.roomID);
        User? foundUser = _userRepo.GetByID(TimeslotDto.userID);

        foundTimeslot.Room = foundRoom;
        foundTimeslot.Name = TimeslotDto.name;
        foundTimeslot.StartTime = TimeslotDto.startTime;
        foundTimeslot.EndTime = TimeslotDto.endTime;
        foundTimeslot.Date = TimeslotDto.date;
        foundTimeslot.UpdatedByUser = foundUser;

        _timeslotRepo.Update(foundTimeslot);
        _timeslotRepo.SaveChanges();

        return foundTimeslot;
    }
}