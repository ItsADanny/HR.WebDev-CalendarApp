import { useState, useEffect } from "react";
import "./css/AdminForms.css";

interface Event {
    id: number;
    name: string;
    description: string;
    fromDateTime: string;
    untilDateTime: string;
    roomBookingId: null;
}

function EditEvent() {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [message, setMessage] = useState("");
    const [form, setForm] = useState({
        name: "",
        description: "",
        date: "",
        startTime: "",
        endTime: ""
    });

    // Fetch all events on mount
    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await fetch("http://localhost:5050/Event", {
                headers: {
                    Authorization: `${localStorage.getItem("token")}`
                }
            });
            const data = await response.json();
            console.log("Events:", data); // Add this to see what's returned
            setEvents(data);
        } catch (err) {
            console.error("Failed to fetch events:", err);
        }
    };

    // Populate form when event is selected
    useEffect(() => {
        if (selectedEvent) {
            setForm({
                name: selectedEvent.name || "",
                description: selectedEvent.description || "",
                date: selectedEvent.date || "",
                startTime: selectedEvent.startTime ? selectedEvent.startTime.slice(0, 8) : "",
                endTime: selectedEvent.endTime ? selectedEvent.endTime.slice(0, 8) : ""
            });
        }
    }, [selectedEvent]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedEvent || !form.name || !form.date || !form.startTime || !form.endTime) return;

        try {

            const response = await fetch(`http://localhost:5050/Event/${selectedEvent.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem("token")}`
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) throw new Error("Failed to update event");

            const updatedEvent = await response.json();
            setSelectedEvent(updatedEvent);
            setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
            setMessage("Event updated successfully!");
            setTimeout(() => setMessage(""), 3000);
        } catch (err) {
            console.error(err);
            setMessage("Error updating event");
        }
    };

    return (
        <div className="new-event-card">
            <h1>Edit Event</h1>

            {/* Event Selection Dropdown */}
            <label>
                Select Event
                <select 
                    value={selectedEvent?.id || ""} 
                    onChange={(e) => {
                        const event = events.find(ev => ev.id === parseInt(e.target.value));
                        setSelectedEvent(event || null);
                    }}
                >
                    <option value="">-- Choose an event --</option>
                    {events.map(event => (
                        <option key={event.id} value={event.id}>
                            {event.name}
                        </option>
                    ))}
                </select>
            </label>

            <br />

            {/* Edit Form - Only show if event is selected */}
            {selectedEvent && (
                <form onSubmit={handleSubmit} style={{ paddingBottom: "100px" }}>
                    <label>
                        Event Name
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <br />

                    <label>
                        Description
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                        />
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
                        Start Time
                        <input
                            type="time"
                            name="startTime"
                            value={form.startTime}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <br />

                    <label>
                        End Time
                        <input
                            type="time"
                            name="endTime"
                            value={form.endTime}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <br />

                    <button type="submit">Update Event</button>

                    {message && <p>{message}</p>}
                </form>
            )}
        </div>
    );
}

export default EditEvent;