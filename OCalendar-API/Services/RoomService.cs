public interface IRoomService
{
    IEnumerable<Room> GetAll();
    Room? GetByID(int id);
    IEnumerable<Room> GetByLocation(int id);
    IEnumerable<Room> GetActive();
    IEnumerable<Room> GetInActive();
    Room Create(RoomDto roomDto);
    Room? Update(int id, RoomDto roomDto);
    bool Delete(int id);
}

public class RoomService : IRoomService
{
    private readonly IRepository<Room> _roomRepo;
    private readonly IRepository<Location> _locationRepo;
    private readonly IRepository<User> _userRepo;

    public RoomService(IRepository<Room> repository, IRepository<Location> locationRepository, IRepository<User> userRepository)
    {
        _roomRepo = repository;
        _locationRepo = locationRepository;
        _userRepo = userRepository;
    }

    public Room Create(RoomDto roomDto)
    {
        Location? foundLocation = _locationRepo.GetByID(roomDto.locationId);
        User? foundUser = _userRepo.GetByID(roomDto.userID);

        Room newRoom = new Room
        {
            Name = roomDto.name,
            Location = foundLocation,
            Active = roomDto.active,
            CreatedByUser = foundUser
        };

        _roomRepo.Add(newRoom);
        _roomRepo.SaveChanges();
        return newRoom;
    }

    public bool Delete(int id)
    {
        Room? foundRoom = _roomRepo.GetByID(id);
        if (foundRoom == null) return false;

        _roomRepo.Delete(foundRoom);
        _roomRepo.SaveChanges();
        return true;
    }

    public IEnumerable<Room> GetActive() => _roomRepo.GetBy(p => p.Active == true);

    public IEnumerable<Room> GetAll() => _roomRepo.ReadAll();

    public Room? GetByID(int id) => _roomRepo.GetByID(id);

    public IEnumerable<Room> GetByLocation(int id) => _roomRepo.GetBy(p => p.Location == _locationRepo.GetByID(id));

    public IEnumerable<Room> GetInActive() => _roomRepo.GetBy(p => p.Active == false);

    public Room? Update(int id, RoomDto roomDto)
    {
        Room? foundRoom = _roomRepo.GetByID(id);
        if (foundRoom == null) return null;

        Location? foundLocation = _locationRepo.GetByID(roomDto.locationId);
        User? foundUser = _userRepo.GetByID(roomDto.userID);

        foundRoom.Name = roomDto.name;
        foundRoom.Location = foundLocation;
        foundRoom.Active = roomDto.active;
        foundRoom.CreatedByUser = foundUser;

        _roomRepo.Update(foundRoom);
        _roomRepo.SaveChanges();

        return foundRoom;
    }
}