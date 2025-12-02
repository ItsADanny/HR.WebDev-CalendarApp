import './css/BookedRooms.css';

interface BookedRoom {
  id: string;
  title: string;
  roomNumber: string;
  location: string;
  timeslot?: string;
}

interface BookedRoomsListProps {
  rooms: BookedRoom[];
  onSelect: (room: BookedRoom) => void;
}

function BookedRooms({ rooms, onSelect }: BookedRoomsListProps) {
  return (
    <div className="booked-rooms-list">

      {rooms.map((room) => (
        <div
          key={room.id}
          className="booked-room-item"
          onClick={() => onSelect(room)}
        >
          {room.title}
        </div>
      ))}
    </div>
  );
}

export default BookedRooms;