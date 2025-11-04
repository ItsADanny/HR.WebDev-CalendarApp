import { NavLink, Outlet } from 'react-router-dom';
import '../stylesheets/BookedRooms.css';
import BookRoomList from './BookaRoomComp/BookRoomList';

const dummyBookedRooms = [
  { id: '1', roomName: 'Atlas', roomNumber: 'A101', location: '1st floor', timeSlot: '09:00 - 10:00', bookedBy: 'Alice' },
  { id: '2', roomName: 'Orion', roomNumber: 'B202', location: '2nd floor', timeSlot: '11:00 - 12:00', bookedBy: 'Bob' },
  { id: '3', roomName: 'Vega', roomNumber: 'C303', location: '3rd floor', timeSlot: '14:00 - 15:00', bookedBy: 'Carol' },
  { id: '4', roomName: 'Sirius', roomNumber: 'D404', location: '4th floor', timeSlot: '16:00 - 17:00', bookedBy: 'Dave' },
  { id: '5', roomName: 'Phoenix', roomNumber: 'E505', location: '5th floor', timeSlot: '13:00 - 14:00', bookedBy: 'Eve' },
  { id: '6', roomName: 'Lynx', roomNumber: 'F606', location: '6th floor', timeSlot: '15:00 - 16:00', bookedBy: 'Frank' },
  { id: '7', roomName: 'Hydra', roomNumber: 'G707', location: '7th floor', timeSlot: '10:00 - 11:00', bookedBy: 'Grace' },
];

function BookedRooms() {
    return (
        <div className="BookedRooms__container">
            <h3>Booked Rooms</h3>
            <div className="BookedRooms__underline"></div>

            {/** component to list booked rooms will go here */}
            <BookRoomList bookedRooms={dummyBookedRooms} />

            <nav className="BookedRooms__NavContainer">
                <NavLink to="new-room" className="BookedRooms__nav-link">Book New Room</NavLink>
                <NavLink to="update-booking" className="BookedRooms__nav-link">Update Booking</NavLink>
            </nav>
        </div>
    );
}

export default BookedRooms;