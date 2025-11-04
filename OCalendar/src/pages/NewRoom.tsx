import RoomDetails from "../components/RoomDetails";

function NewRoom() {
    const selectedBooking = {
        roomName: "Room A",
        date: "2024-07-15",
    };

    return(


        <div className="BookaRoom__container">
            <div className="BookaRoom__left-box">
                <RoomDetails booking={selectedBooking} />
            </div>

            <div className="BookaRoom__right-box">
                Hoi
            </div>
        </div>
    )
}

export default NewRoom;