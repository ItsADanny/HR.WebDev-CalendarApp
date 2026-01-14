import { NavLink } from "react-router-dom";
import '../stylesheets/BookaRoom.css';
import HeaderCard from "../components/Bookingcomponents/HeaderCard.tsx";
import RoomInfoCard from "../components/Bookingcomponents/RoomInfoCard.tsx";
import RoomCommentCard from "../components/Bookingcomponents/RoomCommentCard.tsx";
import BookedRooms from "../components/Bookingcomponents/BookedRooms.tsx";
import { useState, useEffect } from "react";
import type { BookedRoom } from '../components/Bookingcomponents/bookedroom.type.ts'
import BookaNewRoom from "./BookaNewRoom.tsx";
import "../stylesheets/BookaNewRoom.css";
import LogoutBtn from "../components/LogoutBtn.tsx";
import NavbarLoggedIn from "../components/NavbarLoggedIn.tsx";

function BookaRoom() {

    // Currently selected room
    // select no room by default
    const [selectedRoom, setSelectedRoom] = useState<BookedRoom | null>(null);

    const [bookedRooms, setBookedRooms] = useState<BookedRoom[]>([]);

    useEffect(() => {
      async function loadBookedRooms() {

          try {
              const isUserId = localStorage.getItem('userId')
              const response = await fetch(`http://localhost:5050/RoomBooking/user/${isUserId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization':`${localStorage.getItem('token')}` }
              });
              const data = await response.json();
              setBookedRooms(data);

          } catch(error) {
              console.log('Failed to load booked rooms: ', error);
          }
      }

    loadBookedRooms();
    }, []);

    async function handleCancelBooking() {
        if (!selectedRoom) {
            alert("No room selected to cancel booking.");
            return;
        }

        const confirmDelete = window.confirm("Are you sure you want to cancel this booking?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5050/RoomBooking/${selectedRoom.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'Authorization':`${localStorage.getItem('token')}` }
            });

            if (!response.ok) {
                throw new Error('Failed to cancel booking');
            }

            // Refresh booked rooms list
            setBookedRooms(prevRooms => prevRooms.filter(room => room.id !== selectedRoom.id));

            setSelectedRoom(null); // Deselect room after cancellation

            alert('Booking cancelled successfully');

        } catch (error) {
            console.error('Error cancelling booking:', error);
            alert('Error cancelling booking. Please try again later.');
        }
    }

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
                </div>
            </div>
            {/* RIGHT COLUMN */}
            <div className="right-column">
                <BookedRooms 
                    bookedRooms={bookedRooms}
                    onSelectRoom={setSelectedRoom}
                />

                <div className="buttons-container">
                    <button 
                        className="cancel-booking-button" 
                        onClick={handleCancelBooking}
                        disabled={!selectedRoom}
                    >
                        Cancel Booking
                    </button>
                    <NavLink to="/book-new-room" className="book-new-room-link">Book a new Room</NavLink>
                    {/* <NavLink to="/update-room" className="update-room-link">Update Room</NavLink> */}
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

export default BookaRoom;