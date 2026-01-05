import "./css/RoomInfoCard.css";
import type { BookedRoom } from './bookedroom.type.ts'


function RoomInfoCard({ booking } : { booking?: BookedRoom}) {
  console.log("Full booking object:", booking);
  console.log("TimeSlot object:", booking?.timeslot);
  console.log("Date value:", booking?.timeslot?.date);
  return (
    <div className="room-info-card">
      <h2>Room Information:</h2>
      <p>Room name: {booking?.room?.name}</p>
      <p>Booking Date: {booking?.timeslot?.date || 'No date'}</p>
      <p>Start Time: {booking?.timeslot?.startTime || 'No start time'} - End Time: {booking?.timeslot?.endTime || 'No end time'}</p>
    </div>
  );
}

export default RoomInfoCard;