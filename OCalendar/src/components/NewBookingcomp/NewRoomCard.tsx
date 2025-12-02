import NewBookingForm from "./NewBookingForm";

function NewRoomCard() {
    return (
        <div className="new-room-card">
            <h2>New Room Booking</h2>
            <p>Please select a room to book.</p>

            {/* Form */}
            <NewBookingForm />

        </div>
    );
}

export default NewRoomCard;