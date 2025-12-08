import { useState } from "react";

function NewBookingForm() {
    const [form, setForm] = useState({
        location: "",
        roomNumber: "",
        date: "",
        timeSlot: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Room ${form.roomNumber} at ${form.location} booked for ${form.date} at ${form.timeSlot}`);
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