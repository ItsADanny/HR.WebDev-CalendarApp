import { NavLink } from "react-router-dom";
import '../stylesheets/BookaRoom.css';
import HeaderCard from "../components/Bookingcomponents/HeaderCard.tsx";
import NewRoomCard from "../components/NewBookingcomp/NewRoomCard.tsx";
import { useEffect, useState } from "react";
import BookedRooms from "../components/Bookingcomponents/BookedRooms.tsx";
import type { BookedRoom } from "../components/Bookingcomponents/bookedroom.type.ts";
import NewBookingForm from "../components/NewBookingcomp/NewBookingForm.tsx";
import OrangeLogo from '../assets/Orange.png'
import LogoutBtn from "../components/LogoutBtn.tsx";
import NavbarLoggedIn from "../components/NavbarLoggedIn.tsx";

function BookaNewRoom() {

    return (
    <>
        <NavLink to="/">Go Back Home</NavLink>
        <div className="booking-container">
            {/* LEFT COLUMN */}
            <div className="left-column">
                <h1>Book a new Room!</h1>
                <div className="cards-container">
                    <NewBookingForm 
                        onBookingCreated={(newBooking: BookedRoom) => {
                            alert(`Booking created successfully for room ID: ${newBooking.roomId}`);
                        }}
                    />
                </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="right-column">
                <div className="login-logo">
                    <img src={OrangeLogo} alt="Orange brand logo" />
                </div>
                
                
                <div className="buttons-container">
                    <NavLink to="/book-a-room">Back to Book a Room</NavLink>
                    
                </div>
            </div>
        </div>
        <NavbarLoggedIn navbarItems={[
                    { name: "Calendar", path: "/calendar" },
                    { name: "Attending", path: "/attending" },
                    { name: "Book a Room", path: "/book-a-room" }
                ]} />
        <LogoutBtn />
    </>
  );
}

export default BookaNewRoom;