import { NavLink } from "react-router-dom";
import '../stylesheets/BookaRoom.css';
import HeaderCard from "../components/Bookingcomponents/HeaderCard.tsx";
import RoomInfoCard from "../components/Bookingcomponents/RoomInfoCard.tsx";
import RoomCommentCard from "../components/Bookingcomponents/RoomCommentCard.tsx";
import BookedRooms from "../components/Bookingcomponents/BookedRooms.tsx";
import { useState } from "react";

function BookaRoom() {
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
        <div className="booking-container">
            {/* LEFT COLUMN */}
            <div className="left-column">
                <HeaderCard 
                    title={selectedRoom && selectedRoom.roomNumber != null ? `Room ${selectedRoom.roomNumber}` : 'Select a Room'}
                    status={selectedRoom ? "Booked" : "Available"}
                />
                <div className="cards-container">
                    <RoomInfoCard 
                        roomNumber={selectedRoom?.roomNumber.toString()}
                        location={selectedRoom?.location}
                        timeslot={selectedRoom?.timeSlot}
                    />
                    <RoomCommentCard comments="" onChange={() => {}} />
                </div>
            </div>
            {/* RIGHT COLUMN */}
            <div className="right-column">
                <p>Booked Rooms</p>
                <BookedRooms rooms={rooms} onSelect={setSelectedRoom} />
                
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