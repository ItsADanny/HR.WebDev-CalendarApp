import './css/BookedRooms.css';
import { useState, useEffect } from 'react';
import type { BookedRoom } from './bookedroom.type.ts'
import BookedRoomItem from './BookedRoomItem.tsx';

function BookedRooms({ setSelectedRoom } : { setSelectedRoom: (room: BookedRoom | null) => void }) {
    const [status, setStatus] = useState<string>('idle');
    const [bookedRooms, setBookedRooms] = useState<BookedRoom[]>([]);

    useEffect(() => {
    async function getBookedRooms() {
        setStatus('loading');

        try {
            const response = await fetch(`http://localhost:5050/RoomBooking`, {method: 'GET'});
            const data = await response.json();
            setBookedRooms(data);

        } catch(error) {
            console.log('Failed to load todo items: ', error);
        } finally {
            setStatus('idle');
        }
    }

    getBookedRooms();
    }, []);

  return (
    <div className="booked-rooms-list">
      { status === 'loading' && <p>Loading...</p> }
      
      {bookedRooms.map((room) => (
        <BookedRoomItem
          key={room.id} 
          bookedroom={room}
          onClick={() => setSelectedRoom(room)}
        />
      ))}
    </div>
  );
}

export default BookedRooms;