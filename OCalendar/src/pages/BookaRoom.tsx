import { NavLink } from "react-router-dom";
import '../stylesheets/BookaRoom.css';
import HeaderCard from "../components/Bookingcomponents/HeaderCard.tsx";
import RoomInfoCard from "../components/Bookingcomponents/RoomInfoCard.tsx";
import RoomCommentCard from "../components/Bookingcomponents/RoomCommentCard.tsx";
import BookedRooms from "../components/Bookingcomponents/BookedRooms.tsx";
import { useState } from "react";

function BookaRoom() {

    // Currently selected room
    // select no room by default
    const [selectedRoom, setSelectedRoom] = useState(null);

    // Comments
    const [comments, setComments] = useState("");

    return (
    <>
        <div className="booking-container">
            {/* LEFT COLUMN */}
            <div className="left-column">
                <HeaderCard 
                    booking={selectedRoom}
                />
                <div className="cards-container">
                    <RoomInfoCard 
                        booking={selectedRoom}
                    />
                    <RoomCommentCard comments="" onChange={() => {}} />
                </div>
            </div>
            {/* RIGHT COLUMN */}
            <div className="right-column">
                <BookedRooms />
                
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