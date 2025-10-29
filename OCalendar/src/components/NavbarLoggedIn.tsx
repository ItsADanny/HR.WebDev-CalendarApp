import { NavLink } from "react-router-dom";
import '../stylesheets/Navbar.css';

function Navbar() {
    return (
        <>
            <nav>
                <NavLink to="/calendar" className="nav-link">Calendar</NavLink>
                <NavLink to="/attending" className="nav-link">Attending</NavLink>
                <NavLink to="/book-a-room" className="nav-link">Book a Room</NavLink>
            </nav>
        </>
    )
}

export default Navbar;