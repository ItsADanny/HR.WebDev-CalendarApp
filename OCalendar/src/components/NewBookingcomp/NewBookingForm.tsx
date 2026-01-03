import { useState } from "react";
import type { Room } from "../Bookingcomponents/bookedroom.type.ts";

function NewBookingForm() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [message, setMessage] = useState("");

    
    const [form, setForm] = useState({
        location: "",
        roomNumber: "",
        date: "",
        timeSlot: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert(`Room ${form.roomNumber} at ${form.location} booked for ${form.date} at ${form.timeSlot}`);

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
                roomNumber: "",
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
                Location
                <select
                    value={form.location}
                    onChange={handleChange}
                    name="location"
                    required
                    >
                    <option value="">Select location</option>
                    <option value="Building A">Building A</option>
                    <option value="Building B">Building B</option>
                    <option value="Building C">Building C</option>
                    <option value="Building D">Building D</option>
                </select>
            </label>
            <br />
            <label>
                Room Number
                <input
                name="roomNumber"
                type="text"
                value={form.roomNumber}
                onChange={handleChange}
                required
                />
            </label>
            <br />
            <label>
                Date
                <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                required
                />
            </label>
            <br />
            <label>
                Timeslot
                <input
                name="timeSlot"
                type="time"
                value={form.timeSlot}
                onChange={handleChange}
                required
                />
            </label>
            <br />
            <button type="submit">Create Room</button>
        </form>
    );
}

export default NewBookingForm;