import "./css/HeaderCard.css";
import type { BookedRoom } from './bookedroom.type.ts'

function HeaderCard({ booking }: { booking?: BookedRoom }) {
    const title = booking ? `${booking.room?.name || ''}` : 'Select a Room';
    const status = booking ? "Booked" : "Available";
    return (
        <>
            <div className="header-card">
                <h1>{title}</h1>
                {/* make dynamic voor switch tussen event en rooms */}
                    <div className={`status-indicator 
                        ${status === "Booked" ? "booked" : "available"}`}>
                            {status}
                    </div>
            </div>
        </>
    );
}

export default HeaderCard;