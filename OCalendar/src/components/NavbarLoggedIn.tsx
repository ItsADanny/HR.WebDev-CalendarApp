import { NavLink } from "react-router-dom";
import '../stylesheets/Navbar.css';

//NOTE ITSDanny: Previous version of the navbar.
//               This worked great for the user but we needed a different version for the admin so i made it dynamic.
// function Navbar() {
//     return (
//         <>
//             <nav className="navbar">
//                 <NavLink to="/calendar" className="nav-link">Calendar</NavLink>
//                 <NavLink to="/attending" className="nav-link">Attending</NavLink>
//                 <NavLink to="/book-a-room" className="nav-link">Book a Room</NavLink>
//             </nav>
//         </>
//     )
// }

//NEW VERSION OF THE NAVBAR
interface NavBarProps {
    navbarItems: { name: string; path: string; }[];
}

function Navbar({navbarItems} : NavBarProps) {
    return (
        <nav className="navbar">
            {navbarItems.map((item) => (
                <NavLink key={item.path} to={item.path} className="nav-link">
                    {item.name}
                </NavLink>
            ))}
        </nav>
    );
}

export default Navbar;