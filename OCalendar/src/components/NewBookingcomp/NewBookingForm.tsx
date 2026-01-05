import { useEffect, useState } from "react";
import type { BookedRoom, Room, TimeSlot } from "../Bookingcomponents/bookedroom.type.ts";


function NewBookingForm( { onBookingCreated }: { onBookingCreated: (booking: BookedRoom) => void }) {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [message, setMessage] = useState("");

    const [form, setForm] = useState({
        roomId: "",
        date: "",
        timeSlot: ""
    });

    const currentUserId = localStorage.getItem("userId");

    useEffect(() => {
        fetch("http://localhost:5050/Room", {
            method: "GET",
            headers: { "Content-Type": "application/json", Authorization: `${localStorage.getItem('token')}` }
        })
        .then(res => res.json())
        .then(data => setRooms(data))
        .catch(() => setMessage("Failed to load rooms"));
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!form.roomId || !form.timeSlot || !currentUserId) return;

        try {
            if (!currentUserId) throw new Error("User not logged in");
            
            // Check if a booking already exists for this room/date/time
            const existingBookingsRes = await fetch(`http://localhost:5050/RoomBooking/room/${form.roomId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json", Authorization: `${localStorage.getItem("token")}` }
            });

            const existingBookings = await existingBookingsRes.json();
            console.log("Existing bookings for room:", existingBookings);
            console.log("Looking for:", { date: form.date, startTime: form.timeSlot });

            const alreadyBooked = existingBookings.some((booking: any) => {
                const existingStart = booking.timeslot?.startTime.substring(0, 5); // "22:00:00" → "22:00"
                const existingEnd = booking.timeslot?.endTime.substring(0, 5);     // "23:00:00" → "23:00"
                
                // Calculate new booking end time
                const newEndHour = (parseInt(form.timeSlot.split(':')[0]) + 1).toString().padStart(2, '0');
                const newEnd = `${newEndHour}:00`;
                
                // Check if times overlap: new start < existing end AND new end > existing start
                const overlaps = form.timeSlot < existingEnd && newEnd > existingStart;
                
                console.log("Checking booking:", {
                    existingTime: `${existingStart}-${existingEnd}`,
                    newTime: `${form.timeSlot}-${newEnd}`,
                    overlaps
                });
                
                return overlaps && booking.timeslot?.date === form.date; // Same date AND overlapping time
            });

            console.log("Is already booked?", alreadyBooked);

            if (alreadyBooked) {
                alert("This room is already booked for that time");
                return;
            }

            // Only if not booked, create timeslot
            const timeslotRes = await fetch(`http://localhost:5050/TimeSlot`, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `${localStorage.getItem("token")}` },
                body: JSON.stringify({
                    roomID: parseInt(form.roomId),
                    name: `Booking ${form.date} ${form.timeSlot}`,
                    startTime: form.timeSlot,
                    endTime: `${(parseInt(form.timeSlot.split(':')[0]) + 1).toString().padStart(2, '0')}:00`,
                    date: form.date,
                    userID: parseInt(currentUserId)
                })
            });

            const timeslot = await timeslotRes.json();
            if (!timeslotRes.ok) throw new Error("Failed to create timeslot");

            // Create booking
            const bookingRes = await fetch("http://localhost:5050/RoomBooking", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `${localStorage.getItem("token")}` },
                body: JSON.stringify({
                    roomID: parseInt(form.roomId),
                    timeslotID: timeslot.id,
                    userID: parseInt(currentUserId)
                })
            });

            const bookingData = await bookingRes.json();
            if (!bookingRes.ok) throw new Error("Failed to book room");

            onBookingCreated(bookingData);
            setForm({ roomId: "", date: "", timeSlot: "" });
            alert("Room booked successfully!");
        } catch (err) {
            console.error(err);
            setMessage("Error booking room");
        }
    };

    return (
        <div className="new-room-card">
            <form onSubmit={handleSubmit}>
                <label>
                    Room
                    <select
                    name="roomId"
                    value={form.roomId}
                    onChange={handleChange}
                    required
                    >
                    <option value="">Select a room</option>

                    {rooms.map(room => (
                        <option key={room.id} value={room.id}>
                            {room.location} - {room.name}
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
                    Time
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
        </div>
    );
}

export default NewBookingForm;