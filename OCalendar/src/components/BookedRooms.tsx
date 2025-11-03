import '../stylesheets/BookedRooms.css';
import BookRoomList from './BookaRoomComp/BookRoomList';

const dummyBookedRooms = [
  { id: '1', roomName: 'Atlas', roomNumber: 'A101', location: '1st floor', timeSlot: '09:00 - 10:00', bookedBy: 'Alice' },
  { id: '2', roomName: 'Orion', roomNumber: 'B202', location: '2nd floor', timeSlot: '11:00 - 12:00', bookedBy: 'Bob' },
  { id: '3', roomName: 'Vega', roomNumber: 'C303', location: '3rd floor', timeSlot: '14:00 - 15:00', bookedBy: 'Carol' },
];

function BookedRooms() {
    return (
        <div className="BookedRooms__container">
            <h3>Booked Rooms</h3>
            <div className="BookedRooms__underline"></div>

            {/** component to list booked rooms will go here */}
            <BookRoomList bookedRooms={dummyBookedRooms} />


        </div>
    );
}

export default BookedRooms;