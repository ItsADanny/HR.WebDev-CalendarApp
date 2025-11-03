import '../stylesheets/RoomDetails.css';
import BookCommentCard from './BookaRoomComp/BookCommentCard';
import BookInfoCard from './BookaRoomComp/BookInfoCard';

function RoomDetails({ booking }: { booking: any }) {
    return (
        <div className="RoomDetails">
            <div className="RoomDetails__titleContainer">
                <p className="RoomDetails__info"><strong>Room Name:</strong> {booking.roomName}</p>
                <div className="RoomDetails__underline"></div>
            </div>
            
            <div className="RoomDetails__cards-container">
                <BookInfoCard booking={booking} />

                <BookCommentCard booking={booking} />
            </div>
        </div>
    );
}

export default RoomDetails;