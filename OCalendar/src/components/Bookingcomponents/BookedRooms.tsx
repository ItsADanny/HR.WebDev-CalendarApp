import './css/BookedRooms.css';
import type { BookedRoom } from './bookedroom.type.ts'
import BookedRoomItem from './BookedRoomItem.tsx';

type Props = {
  bookedRooms: BookedRoom[];
  onSelectRoom: (room: BookedRoom) => void;
}

function BookedRooms( {bookedRooms, onSelectRoom }: Props ) {
  return (
    <div className="booked-rooms-list">
      <p>My Booked Rooms</p>

      {bookedRooms.length === 0 && (<p>No booked rooms found.</p>)}

      {bookedRooms.map((booking) => (
        <BookedRoomItem 
          key={booking.id} 
          bookedroom={booking}
          onClick={() => onSelectRoom(booking)}
        />
      ))}
    </div>
  );
}

export default BookedRooms;