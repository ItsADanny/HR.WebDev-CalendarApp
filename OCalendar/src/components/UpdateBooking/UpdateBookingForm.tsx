import { useState, useEffect } from "react";
import type { BookedRoom } from "../Bookingcomponents/bookedroom.type";

interface Props {
  selectedRoom: BookedRoom;
  onUpdate: (updated: BookedRoom) => void;
}

function UpdateBookingForm({ selectedRoom, onUpdate }: Props) {
    const [form, setForm] = useState({
        date: "",
        timeSlot: ""
    });

    // Generate time slots from 08:00 to 20:00
    const timeSlots = Array.from({ length: 14 }, (_, i) => {
        const hour = i + 8; // 8 -> 20
        const start = hour.toString().padStart(2, "0") + ":00";
        const endHour = hour + 1;
        const end = endHour.toString().padStart(2, "0") + ":00";
        return { start, end };
    });

    useEffect(() => {
        if (!selectedRoom) return;

        const dateStr = selectedRoom.timeSlot?.date || new Date().toISOString().slice(0, 10);
        const timeStr = selectedRoom.timeSlot?.startTime || "08:00";

        setForm({
            date: dateStr,
            timeSlot: timeStr.slice(0, 5)
        });
    }, [selectedRoom]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedRoom) {
            alert("No room selected for update.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5050/RoomBooking/${selectedRoom.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json", Authorization: `${localStorage.getItem('token')}` },
                body: JSON.stringify({
                    roomId: selectedRoom.roomId,
                    createDateTime: `${form.date}T${form.timeSlot}:00`
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update booking');
            }

            const updatedBooking = { ...selectedRoom,
                createDateTime: `${form.date}T${form.timeSlot}:00`
            };
                

            onUpdate(updatedBooking);

            alert("Booking updated successfully!");

        } catch (error) {
            console.error("Error updating booking:", error);
        }
    };

    if (!selectedRoom) {
        return <p>Please select a booked room to update.</p>;
    }

    return (
        <div className="new-room-card">
            <form onSubmit={handleSubmit}>
                <label>
                    Date:
                    <input type="date" name="date" value={form.date || ""} onChange={handleChange} />
                </label>
                <label>
                    <select name="timeSlot" value={form.timeSlot} onChange={handleChange}>
                        {timeSlots.map(slot => (
                        <option key={slot.start} value={slot.start}>
                            {slot.start} - {slot.end}
                        </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Update Booking</button>
            </form>

            {/* Display old booking information: */}
            <br></br>
            old booking information:
            <div>
                <p>Room: {selectedRoom.room?.name}</p>
                <p>Date: {selectedRoom.timeSlot?.date}</p>
                <p>Time: {selectedRoom.timeSlot?.startTime} - {selectedRoom.timeSlot?.endTime}</p>
            </div>
        </div>
    );
}

export default UpdateBookingForm;