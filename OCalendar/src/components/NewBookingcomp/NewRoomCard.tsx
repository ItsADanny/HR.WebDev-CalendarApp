import NewBookingForm from "./NewBookingForm";
import "./css/NewRoomCard.css"

function NewRoomCard() {
    return (
        <div className="new-room-card">

            {/* Form */}
            <NewBookingForm />

        </div>
    );
}

export default NewRoomCard;