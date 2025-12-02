import { NavLink } from "react-router-dom";
import '../stylesheets/BookaRoom.css';
import HeaderCard from "../components/Bookingcomponents/HeaderCard.tsx";
import RoomInfoCard from "../components/Bookingcomponents/RoomInfoCard.tsx";
import RoomCommentCard from "../components/Bookingcomponents/RoomCommentCard.tsx";

function BookaRoom() {
    return (
    <>
        <NavLink to="/">Go Back Home</NavLink>
        <div className="booking-container">
            {/* LEFT COLUMN */}
            <div className="left-column">
                <HeaderCard />
                <div className="cards-container">
                    <RoomInfoCard />
                    <RoomCommentCard comments="" onChange={() => {}} />
                </div>
            </div>
            {/* RIGHT COLUMN */}
            <div className="right-column">
                <p>Booked Rooms!</p>
                {/* hier moeten de booked rooms komen */}
                <div className="buttons-container">
                    <button className="cancel-booking-button" onClick={() => alert('Booking Cancelled!')}>Cancel Booking</button>
                    <NavLink to="/book-new-room" className="book-new-room-link">Book a new Room</NavLink>
                    <NavLink to="/update-room" className="update-room-link">Update Room</NavLink>
                </div>
            </div>
        </div>
    </>
  );
}

export default BookaRoom;