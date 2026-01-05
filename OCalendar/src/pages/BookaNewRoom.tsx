import { NavLink } from "react-router-dom";
import '../stylesheets/BookaRoom.css';
import HeaderCard from "../components/Bookingcomponents/HeaderCard.tsx";
import NewRoomCard from "../components/NewBookingcomp/NewRoomCard.tsx";
import { useState } from "react";

function BookaNewRoom() {

    // Currently selected room
    // select no room by default
    const [selectedRoom, setSelectedRoom] = useState(null);

    // Comments
    const [comments, setComments] = useState("");

    return (
    <>
        <NavLink to="/">Go Back Home</NavLink>
        <div className="booking-container">
            {/* LEFT COLUMN */}
            <div className="left-column">
                <HeaderCard />
                <div className="cards-container">
                    <NewRoomCard />
                </div>
            </div>
            {/* RIGHT COLUMN */}
            <div className="right-column">
                <p>Booked Rooms</p>
                
                <div className="buttons-container">
                    <button className="confirm-booking-button" onClick={() => alert('Booking Confirmed!')}>Confirm Booking</button>
                    <NavLink to="/book-a-room">Back to Book a Room</NavLink>
                    
                </div>
            </div>
        </div>
    </>
  );
}

export default BookaNewRoom;