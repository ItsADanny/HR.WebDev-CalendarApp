import { NavLink } from "react-router-dom";
import '../stylesheets/BookaRoom.css';
import HeaderCard from "../components/Bookingcomponents/HeaderCard.tsx";
import { useEffect, useState } from "react";
import type { BookedRoom } from '../components/Bookingcomponents/bookedroom.type.ts'
import UpdateBookingForm from "../components/UpdateBooking/UpdateBookingForm.tsx";
import BookedRooms from "../components/Bookingcomponents/BookedRooms.tsx";

function UpdateRoom() {

    // Currently selected room
    // select no room by default
    const [selectedRoom, setSelectedRoom] = useState<BookedRoom | null>(null);
    const [bookedRooms, setBookedRooms] = useState<BookedRoom[]>([]);

    useEffect(() => {
        async function loadBookedRooms() {
            try {
                const isUserId = localStorage.getItem('userId');
                const response = await fetch(`http://localhost:5050/RoomBooking/user/${isUserId}`, {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json', 
                        'Authorization': `${localStorage.getItem('token')}` 
                    }
                });
                const data = await response.json();
                setBookedRooms(data);
            } catch(error) {
                console.log('Failed to load booked rooms: ', error);
            }
        }
        loadBookedRooms();
    }, []);

    
    return (
    <>
        <div className="booking-container">
            {/* LEFT COLUMN */}
            <div className="left-column">
                <HeaderCard booking={selectedRoom} />
                <div className="cards-container">
                    <UpdateBookingForm 
                        selectedRoom={selectedRoom}
                        onUpdate={(updated) => {
                            setBookedRooms(prev => prev.map((room) => room.id === updated.id ? updated : room));
                            setSelectedRoom(updated);
                        }}
                    />
                </div>
            </div>
            {/* RIGHT COLUMN */}
            <div className="right-column">
                <BookedRooms bookedRooms={bookedRooms} onSelectRoom={setSelectedRoom} />
                
                <div className="buttons-container">
                    <button className="confirm-booking-button" onClick={() => alert('Booking Updated!')}>Update Booking</button>
                    <NavLink to="/book-a-room">
                        Back to Book a Room
                    </NavLink>
                    
                </div>
            </div>
        </div>
    </>
  );
}

export default UpdateRoom;