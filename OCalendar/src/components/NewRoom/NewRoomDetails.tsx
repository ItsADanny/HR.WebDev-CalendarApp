import NewRoomInfoCard from "./NewRoomInfoCard";

function NewRoomDetails({ booking }: { booking: any }) {
    return (
        <div className="RoomDetails">
            <div className="RoomDetails__titleContainer">
                <div className="RoomDetails__title-content">
                    <p className="RoomDetails__info"><strong>Room Name:</strong> {booking.roomName}</p>
                    <div className="RoomDetails__underline"></div>
                </div>
                <button className="RoomDetails__booked-btn">Booked</button>
            </div>
            
            <div className="RoomDetails__cards-container">
                {/* <BookInfoCard booking={booking}/> reuse this css */}
                <NewRoomInfoCard booking={booking}/>
            </div>
        </div>
    );
}

export default NewRoomDetails;