import { NavLink } from "react-router-dom";
import '../stylesheets/BookaRoom.css';
import HeaderCard from "../components/Bookingcomponents/HeaderCard.tsx";
import NewRoomCard from "../components/NewBookingcomp/NewRoomCard.tsx";
import { useState } from "react";

function BookaNewRoom() {
    const [rooms] = useState([
        {
        id: 1,
        title: "Book a Room #1",
        roomNumber: 12,
        location: "Kolding",
        timeSlot: "12:00-13:00",
        },
        {
        id: 2,
        title: "Book a Room #2",
        roomNumber: 25,
        location: "Odense",
        timeSlot: "14:00-15:00",
        },
        {
        id: 3,
        title: "Book a Room #3",
        roomNumber: 30,
        location: "Aarhus",
        timeSlot: "16:00-17:00",
        },
    ]);

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
                <HeaderCard title="New Room" status="Available"/>
                <div className="cards-container">
                    <NewRoomCard />
                </div>
            </div>
            {/* RIGHT COLUMN */}
            <div className="right-column">
                
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