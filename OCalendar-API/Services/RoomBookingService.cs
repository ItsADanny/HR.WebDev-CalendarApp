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

    public RoomBookingService(IRepository<RoomBooking> repository)
    {
        _roomBookingRepo = repository;
    }

    public RoomBooking Create(RoomBookingDto roomBookingDto)
    {
        RoomBooking newRoomBooking = new RoomBooking
        {
            RoomID = roomBookingDto.roomID,
            TimeSlotID = roomBookingDto.timeslotID,
            BookedByUserID = roomBookingDto.userID
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

    public IEnumerable<RoomBooking> GetByTimeslot(int timeslotId) => _roomBookingRepo.GetBy(p => p.TimeSlotID == timeslotId);
    public IEnumerable<RoomBooking> GetByRoom(int roomId) => _roomBookingRepo.GetBy(p => p.RoomID == roomId);
    public IEnumerable<RoomBooking> GetByUser(int userId) => _roomBookingRepo.GetBy(p => p.BookedByUserID == userId);

    public RoomBooking? Update(int id, RoomBookingDto roomBookingDto)
    {
        RoomBooking? foundRoomBooking = _roomBookingRepo.GetByID(id);
        if (foundRoomBooking == null) return null;

        foundRoomBooking.TimeSlotID = roomBookingDto.timeslotID;

        _roomBookingRepo.Update(foundRoomBooking);
        _roomBookingRepo.SaveChanges();

        return foundRoomBooking;
    }

}