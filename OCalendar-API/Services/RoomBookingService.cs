public interface IRoomBookingService
{
    IEnumerable<RoomBooking> GetAll();
    RoomBooking? GetByID(int id);
    IEnumerable<RoomBooking> GetByTimeslot(int timeslotId);
    IEnumerable<RoomBooking> GetByRoom(int roomId);
    IEnumerable<RoomBooking> GetByUser(int userId);
    RoomBooking Create(RoomBookingDto roomBookingDto);
    RoomBooking? Update(int id, RoomBookingDto roomBookingDto);
    bool Delete(int id);
}

public class RoomBookingService : IRoomBookingService
{
    private readonly IRepository<RoomBooking> _roomBookingRepo;
    private readonly IRepository<Room> _roomRepo;
    private readonly IRepository<Timeslot> _timeslotRepo;
    private readonly IRepository<User> _userRepo;

    public RoomBookingService(IRepository<RoomBooking> repository, IRepository<Room> roomRepository, IRepository<Timeslot> timeslotRepository, IRepository<User> userRepository)
    {
        _roomBookingRepo = repository;
        _roomRepo = roomRepository;
        _timeslotRepo = timeslotRepository;
        _userRepo = userRepository;
    }

    public RoomBooking Create(RoomBookingDto roomBookingDto)
    {
        Room? foundRoom = _roomRepo.GetByID(roomBookingDto.roomID);
        Timeslot? foundTimeslot = _timeslotRepo.GetByID(roomBookingDto.timeslotID);
        User? foundUser = _userRepo.GetByID(roomBookingDto.userID);

        RoomBooking newRoomBooking = new RoomBooking
        {
            Room = foundRoom,
            Timeslot = foundTimeslot,
            BookedByUser = foundUser
        };

        _roomBookingRepo.Add(newRoomBooking);
        _roomBookingRepo.SaveChanges();
        return newRoomBooking;
    }

    public bool Delete(int id)
    {
        RoomBooking? foundRoomBooking = _roomBookingRepo.GetByID(id);
        if (foundRoomBooking == null) return false;

        _roomBookingRepo.Delete(foundRoomBooking);
        _roomBookingRepo.SaveChanges();
        return true;
    }

    public IEnumerable<RoomBooking> GetAll() => _roomBookingRepo.ReadAll();

    public RoomBooking? GetByID(int id) => _roomBookingRepo.GetByID(id);

    public IEnumerable<RoomBooking> GetByTimeslot(int timeslotId) => _roomBookingRepo.GetBy(p => p.Timeslot == _timeslotRepo.GetByID(timeslotId));
    public IEnumerable<RoomBooking> GetByRoom(int roomId) => _roomBookingRepo.GetBy(p => p.Room == _roomRepo.GetByID(roomId));
    public IEnumerable<RoomBooking> GetByUser(int userId) => _roomBookingRepo.GetBy(p => p.BookedByUser == _userRepo.GetByID(userId));

    public RoomBooking? Update(int id, RoomBookingDto roomBookingDto)
    {
        RoomBooking? foundRoomBooking = _roomBookingRepo.GetByID(id);
        if (foundRoomBooking == null) return null;

        Timeslot? foundTimeslot = _timeslotRepo.GetByID(roomBookingDto.timeslotID);
        foundRoomBooking.Timeslot = foundTimeslot;

        _roomBookingRepo.Update(foundRoomBooking);
        _roomBookingRepo.SaveChanges();

        return foundRoomBooking;
    }

}