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

    public RoomService(IRepository<Room> repository)
    {
        _roomRepo = repository;
    }

    public Room Create(RoomDto roomDto)
    {
        Room newRoom = new Room
        {
            Name = roomDto.name,
            LocationId = roomDto.locationId,
            Active = roomDto.active,
            CreatedByUserID = roomDto.userID
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

    public IEnumerable<Room> GetByLocation(int id) => _roomRepo.GetBy(p => p.LocationId == id);

    public IEnumerable<Room> GetInActive() => _roomRepo.GetBy(p => p.Active == false);

    public Room? Update(int id, RoomDto roomDto)
    {
        Room? foundRoom = _roomRepo.GetByID(id);
        if (foundRoom == null) return null;

        foundRoom.Name = roomDto.name;
        foundRoom.LocationId = roomDto.locationId;
        foundRoom.Active = roomDto.active;
        foundRoom.CreatedByUserID = roomDto.userID;

        _roomRepo.Update(foundRoom);
        _roomRepo.SaveChanges();

        return foundRoom;
    }
}