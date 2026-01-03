import { useEffect, useState } from "react";
import type { Room } from "../Bookingcomponents/bookedroom.type.ts";

function NewBookingForm() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [message, setMessage] = useState("");

    
    const [form, setForm] = useState({
        location: "",
        roomName: "",
        date: "",
        timeSlot: ""
    });

    useEffect(() => {
        fetch("http://localhost:5050/Room")
        .then(res => res.json())
        .then(data => setRooms(data))
        .catch(() => setMessage("Failed to load rooms"));
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert(`Room ${form.roomName} at ${form.location} booked for ${form.date} at ${form.timeSlot}`);

        try {
            const response = await fetch("http://localhost:5050/RoomBooking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            const data = await response.json();

            if (!response.ok) {
                console.error("Error booking room:", data.message || "Something went wrong");
                return;
            }

            console.log("Room booked successfully:", data.message);
            setForm({
                location: "",
                roomName: "",
                date: "",
                timeSlot: ""
            });
        } catch (err) {
            console.error("Error booking room:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Room
                <select
                name="roomId"
                value={form.roomName}
                onChange={handleChange}
                required
                >
                <option value="">Select a room</option>

                {rooms.map(room => (
                    <option key={room.id} value={room.id}>
                    {room.location} - Room {room.name}
                    </option>
                ))}
                </select>
            </label>

            <br />

            <label>
                Date
                <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                />
            </label>

            <br />

            <label>
                Time Slot
                <input
                type="time"
                name="timeSlot"
                value={form.timeSlot}
                onChange={handleChange}
                required
                />
            </label>

            <br />

            <button type="submit">Book Room</button>

            {message && <p>{message}</p>}
        </form>
    );
}

export default NewBookingForm;