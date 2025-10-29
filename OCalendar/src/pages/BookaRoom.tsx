import { NavLink, Outlet } from "react-router-dom";
import '../stylesheets/BookaRoom.css';

function BookaRoom() {
    return (
        <div className="BookaRoom__white-box">
            <div className="BookaRoom__white-box-inside">
                <div className="BookaRoom__event-title-row">
                    <div className="BookaRoom__event-title-container">
                        <h2 className="BookaRoom__event-title">Event Title</h2>
                        <div className="BookaRoom__event-title-underline"></div>
                    </div>
                    <button className="BookaRoom__attending-btn">Booked</button>
                </div>

                <div className="BookaRoom__inner-container-vertical">
                    <div className="BookaRoom__grey-top">
                        <p>Top box content</p>
                    </div>
                    <div className="BookaRoom__grey-bottom">
                        <p>Bottom box content</p>
                    </div>
                </div>
            </div>
            <div className="BookaRoom__event-list">
                <h3>Booked rooms</h3>
                <div className="BookaRoom__title-underline"></div>
                <div className="BookaRoom__booked-rooms-container">
                    <div className="BookaRoom__event-item">Room 1</div>
                    <div className="BookaRoom__event-item">Room 2</div>
                    <div className="BookaRoom__event-item">Room 3</div>
                </div>
                <nav className="BookaRoom__nav">
                    <NavLink to="new-room" className="BookaRoom__nav-link">Book New Room</NavLink>
                    <NavLink to="new-room" className="BookaRoom__nav-link">Update Booking</NavLink>
                </nav>
                <Outlet />
            </div>
        </div>
    );
}

export default BookaRoom;