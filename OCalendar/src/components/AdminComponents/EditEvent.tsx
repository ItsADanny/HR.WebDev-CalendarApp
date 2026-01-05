import { useState, useEffect } from "react";
import "./css/AdminForms.css";

interface Event {
    id: number;
    title: string;
    description: string;
    fromDateTime: string;
    untilDateTime: string;
}

function EditEvent({ onEventUpdated }: { onEventUpdated: (event: Event) => void }) {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        title: "",
        description: "",
        fromDateTime: "",
        untilDateTime: ""
    });

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:5050/Event', {
                    method: 'GET',
                    headers: { 
                        "Content-Type": "application/json",
                        Authorization: `${localStorage.getItem('token')}`
                    }
                });
                
                if (!response.ok) throw new Error('Failed to fetch events');
                
                const data = await response.json();
                setEvents(Array.isArray(data) ? data : data.events || []);
            } catch (err) {
                console.error('Error:', err);
                setMessage('Error loading events');
            } finally {
                setLoading(false);
            }
        };
        
        fetchEvents();
    }, []);

    const handleSelectEvent = (eventId: number) => {
        const event = events.find(e => e.id === eventId);
        if (event) {
            setSelectedEvent(event);
            setForm({
                title: event.title,
                description: event.description,
                fromDateTime: event.fromDateTime,
                untilDateTime: event.untilDateTime
            });
            setMessage("");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedEvent || !form.title || !form.fromDateTime || !form.untilDateTime) return;

        try {
            const response = await fetch(`http://localhost:5050/Event/${selectedEvent.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title: form.title,
                    description: form.description,
                    roomBookingID: null,
                    startDateTime: form.fromDateTime + ":00",
                    endDateTime: form.untilDateTime + ":00",
                    userID: Number(localStorage.getItem("userId"))
                })
            });

            if (!response.ok) throw new Error("Failed to update event");

            const eventData = await response.json();
            onEventUpdated(eventData);
            setMessage("Event updated successfully!");
            setSelectedEvent(null);
            setForm({ title: "", description: "", fromDateTime: "", untilDateTime: "" });
            setTimeout(() => setMessage(""), 3000);
        } catch (err) {
            console.error(err);
            setMessage("Error updating event");
        }
    };

    if (loading) return <p>Loading events...</p>;

    return (
        <div className="new-event-card">
            <h1>Edit Event</h1>
            
            <label>
                Select Event Title
                <select onChange={(e) => handleSelectEvent(Number(e.target.value))} value={selectedEvent?.id || ""}>
                    <option value="">-- Select an event --</option>
                    {events.map(event => (
                        <option key={event.id} value={event.id}>
                            {event.title}
                        </option>
                    ))}
                </select>
            </label>

            <br />

            {selectedEvent && (
                <form onSubmit={handleSubmit}>
                    <label>
                        Title
                        <input
                            type="text"
                            name="title"
                            value={form.title}
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
                        From Date & Time
                        <input
                            type="datetime-local"
                            name="fromDateTime"
                            value={form.fromDateTime}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <br />

                    <label>
                        Until Date & Time
                        <input
                            type="datetime-local"
                            name="untilDateTime"
                            value={form.untilDateTime}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <br />

                    <button type="submit">Update Event</button>

                    {message && <p>{message}</p>}
                </form>
            )}

            {message && !selectedEvent && <p>{message}</p>}
        </div>
    );
}

export default EditEvent;