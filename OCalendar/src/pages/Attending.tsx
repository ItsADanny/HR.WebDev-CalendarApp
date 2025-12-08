import '../stylesheets/Attending.css';
import HeaderCard from '../components/Bookingcomponents/HeaderCard';
import RoomInfoCard from '../components/Bookingcomponents/RoomInfoCard';
import RoomCommentCard from '../components/Bookingcomponents/RoomCommentCard';

function Attending() {
    return(
    <>
        <div className="booking-container">
            {/* LEFT COLUMN */}
            <div className="left-column">
                <HeaderCard status="not attending"/>
                <div className="cards-container">
                    <RoomInfoCard/>
                    <RoomCommentCard comments="" onChange={() => {}} />
                </div>
            </div>
            {/* RIGHT COLUMN */}
            <div className="right-column">
                {/* dit worden nog 2 components dan */}
                <p>Events</p>

                <p>Not attending</p>
            </div>
        </div>
    </>
    );
}

export default Attending;