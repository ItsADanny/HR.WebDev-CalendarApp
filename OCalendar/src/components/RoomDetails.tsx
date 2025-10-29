function RoomDetails({ booking }) {
    return (
        <div className="RoomDetails__container">
            <h2 className="RoomDetails__title">Room Details</h2>
            <p className="RoomDetails__info"><strong>Room Name:</strong> {booking.roomName}</p>
            <p className="RoomDetails__info"><strong>Date:</strong> {booking.date}</p>
        </div>
    );
}

export default RoomDetails;