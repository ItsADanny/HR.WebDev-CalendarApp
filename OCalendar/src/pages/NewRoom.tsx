import BookedRooms from "../components/BookedRooms";
import NewRoomDetails from "../components/NewRoom/NewRoomDetails";


function NewRoom() {
    const selectedBooking = {
        roomName: "Room A",
        date: "2024-07-15",
    };

    return(


        <div className="BookaRoom__container">
            <div className="BookaRoom__left-box">
                <NewRoomDetails booking={selectedBooking} />
            </div>

            <div className="BookaRoom__right-box">
                Hello newRoom
            </div>
        </div>
    )
}

export default NewRoom;