import './css/BookedRooms.css';
import { useState, useEffect } from 'react';
import type { Room, TimeSlot, BookedRoom } from './bookedroom.type.ts'
import BookedRoomItem from './BookedRoomItem.tsx';



function BookedRooms() {
    const [status, setStatus] = useState<string>('idle');
    const [bookedRooms, setBookedRooms] = useState<BookedRoom[]>([]);

    useEffect(() => {
      async function loadBookedRooms() {
          setStatus('loading');

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
          } finally {
              setStatus('idle');
          }
      }

    loadBookedRooms();
    }, []);

  return (
    <div className="booked-rooms-list">
      <p>My Booked Rooms</p>

      { status === 'loading' && <p>Loading...</p> }
      
      {bookedRooms.map((booking) => (
        <BookedRoomItem key={booking.id} bookedroom={booking} />
      ))}
    </div>
  );
}

export default BookedRooms;