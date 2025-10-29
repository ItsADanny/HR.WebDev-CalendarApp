import '../stylesheets/RoomDetails.css';

function RoomDetails({ booking }: { booking: any }) {
    return (
        <div className="RoomDetails__container">
            <p className="RoomDetails__info"><strong>Room Name:</strong> {booking.roomName}</p>
            <div className="RoomDetails__underline"></div>

            <div className="RoomDetails__infocard">
                <p><strong>Room number:</strong> {booking.roomNumber}</p>
                <p><strong>Location:</strong> {booking.location}</p>
                <p><strong>Timeslot:</strong> {booking.timeSlot}</p>
            </div>

            <div className="RoomDetails__commentcard">
                <p><strong>Comments:</strong></p>
                <p>{booking.comments}</p>
            </div>
        </div>
    );
}

export default RoomDetails;