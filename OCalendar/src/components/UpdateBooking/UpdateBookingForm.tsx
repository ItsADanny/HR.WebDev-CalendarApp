import { useState, useEffect } from "react";
import type { BookedRoom } from "../Bookingcomponents/bookedroom.type";

interface Props {
  selectedRoom: BookedRoom | null;
  onUpdate: (updated: BookedRoom) => void;
}

function UpdateBookingForm({ selectedRoom, onUpdate }: Props) {
    const [message, setMessage] = useState("");
    const [form, setForm] = useState({
        date: "",
        timeSlot: ""
    });

    // Generate time slots from 08:00 to 20:00
    const timeSlots = Array.from({ length: 14 }, (_, i) => {
        const hour = i + 8;
        const start = hour.toString().padStart(2, "0") + ":00";
        const endHour = hour + 1;
        const end = endHour.toString().padStart(2, "0") + ":00";
        return { start, end };
    });

    // Populate form when room is selected
    useEffect(() => {
        if (selectedRoom) {
            const dateStr = selectedRoom.timeSlot?.date || new Date().toISOString().slice(0, 10);
            const timeStr = selectedRoom.timeSlot?.startTime || "08:00";

            setForm({
                date: dateStr,
                timeSlot: timeStr.slice(0, 5)
            });
        }
    }, [selectedRoom]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedRoom) {
            alert("No room selected for update.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5050/RoomBooking/${selectedRoom.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", "Authorization": `${localStorage.getItem('token')}` },
                body: JSON.stringify({
                    roomId: selectedRoom.roomId,
                    createDateTime: `${form.date}T${form.timeSlot}:00`
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update booking');
            }

            const updatedBooking = await response.json();
            onUpdate(updatedBooking);
            setMessage("Booking updated successfully!");
            setTimeout(() => setMessage(""), 3000);
        } catch (error) {
            console.error("Error updating booking:", error);
            setMessage("Error updating booking");
        }
    };

    if (!selectedRoom) {
        return <p>Please select a booked room to update.</p>;
    }

    const selectedTimeSlot = timeSlots.find(slot => slot.start === form.timeSlot);

    return (
        <div className="new-room-card">
            <form onSubmit={handleSubmit}>
                <label>
                    Date: {new Date(form.date).toLocaleDateString()}
                    <input type="date" name="date" value={form.date || ""} onChange={handleChange} required />
                </label>

                <br />

                <label>
                    Time Slot: {selectedTimeSlot && `${selectedTimeSlot.start} - ${selectedTimeSlot.end}`}
                    <select name="timeSlot" value={form.timeSlot} onChange={handleChange} required>
                        {timeSlots.map(slot => (
                            <option key={slot.start} value={slot.start}>
                                {slot.start} - {slot.end}
                            </option>
                        ))}
                    </select>
                </label>

                <br />

                <button type="submit">Update Booking</button>

                {message && <p>{message}</p>}
            </form>
        </div>
    );
}

export default UpdateBookingForm;