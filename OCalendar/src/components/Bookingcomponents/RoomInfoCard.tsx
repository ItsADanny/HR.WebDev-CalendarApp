import "./css/RoomInfoCard.css";

interface RoomInfoCardProps {
  roomNumber?: string;
  location?: string;
  timeslot?: string;
}

function RoomInfoCard({ roomNumber, location, timeslot }: RoomInfoCardProps) {
  return (
    <div className="room-info-card">
      <h2>Room Information:</h2>
      <p>Room number: {roomNumber}</p>
      <p>Location: {location}</p>
      <p>Timeslot: {timeslot}</p>
    </div>
  );
}

export default RoomInfoCard;