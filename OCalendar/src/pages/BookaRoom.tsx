import { NavLink, Outlet } from "react-router-dom";
import '../stylesheets/BookaRoom.css';
import RoomDetails from "../components/RoomDetails";
import BookedRooms from "../components/BookedRooms";

function BookaRoom() {
    const selectedBooking = {
        roomName: "Room A",
        date: "2024-07-15",
    };

    return (
        <div className="BookaRoom__container">
            <div className="BookaRoom__left-box">
                <RoomDetails booking={selectedBooking}/>
            </div>

            <div className="BookaRoom__right-box">
                <BookedRooms />
            </div>
        </div>
    );
}
export default BookaRoom;