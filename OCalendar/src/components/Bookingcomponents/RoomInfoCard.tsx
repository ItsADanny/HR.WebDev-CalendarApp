import "./css/RoomInfoCard.css";
import type { BookedRoom } from './bookedroom.type.ts'


function RoomInfoCard({ booking } : { booking?: BookedRoom}) {
  return (
    <div className="room-info-card">
      <h2>Room Information:</h2>
      <p>Room name: {booking?.room?.name}</p>
      <p>Booking Date: {booking ? new Date(booking.createDateTime).toLocaleDateString() : ''}</p>
    </div>
  );
}

export default RoomInfoCard;