import OrangeLogo from './assets/Orange.png'
import './stylesheets/MenuBar.css'

function MenuBar() {
    return(
        <div className="menu-bar">
            <div className="menu-events">
                <a href="Calendar.html" id="active">Events</a>
            </div>
            <div className="menu-attending">
                <a href="Attending.html">Attending</a>
            </div>
            <div className="menu-book-a-room">
                <a href="Book-a-room.html">Book a room</a>
            </div>
        </div>
    );
}

export default MenuBar