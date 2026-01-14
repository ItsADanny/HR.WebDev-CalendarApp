import { useState, useEffect } from "react";
import "./css/AdminForms.css";
import LogoutBtn from "../LogoutBtn";
import NavbarLoggedIn from "../NavbarLoggedIn";
import { useNavigate } from "react-router-dom";

interface Event {
    id: number;
    title: string;
    description: string;
    fromDateTime: string;
    untilDateTime: string;
    roomBookingId: null;
}

function EditEvent() {
    if (localStorage.getItem('adminPanelAccess') !== '1') {
        const navigate = useNavigate();
        navigate('/calendar');
    }

    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [message, setMessage] = useState("");
    const [form, setForm] = useState({
        title: "",
        description: "",
        fromDateTime: "",
        untilDateTime: ""
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
                title: selectedEvent.title || "",
                description: selectedEvent.description || "",
                fromDateTime: selectedEvent.fromDateTime || "",
                untilDateTime: selectedEvent.untilDateTime || ""
            });
        }
    }, [selectedEvent]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedEvent || !form.title || !form.fromDateTime || !form.untilDateTime) return;

        try {
            const token = localStorage.getItem("token");
            console.log("Using token:", token);

            // Format datetime-local to ISO 8601 with Z suffix
            const formatDateTime = (dateTimeLocal: string): string => {
                if (!dateTimeLocal) return "";
                // Convert "2026-01-12T19:15" to "2026-01-12T19:15:00.000Z"
                return `${dateTimeLocal}:00.000Z`;
            };

            const startDateTime = formatDateTime(form.fromDateTime);
            const endDateTime = formatDateTime(form.untilDateTime);

            const payload = {
                title: form.title,
                description: form.description,
                startDateTime: startDateTime,
                endDateTime: endDateTime
            };

            console.log("Sending payload:", payload);

            const response = await fetch(`http://localhost:5050/Event/${selectedEvent.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem("token")}`
                },
                body: JSON.stringify(payload)
            });

            console.log("Response status:", response.status);

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
        <>
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
                                {event.title}
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
                            From DateTime
                            <input
                                type="datetime-local"
                                name="fromDateTime"
                                value={form.fromDateTime.slice(0, 16)}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <br />

                        <label>
                            Until DateTime
                            <input
                                type="datetime-local"
                                name="untilDateTime"
                                value={form.untilDateTime.slice(0, 16)}
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
            <NavbarLoggedIn navbarItems={[
                { name: "All Events", path: "/all-events" },
                { name: "Create New Event", path: "/new-event" },
                { name: "Edit Event", path: "/edit-event" },
                { name: "Delete Event", path: "/delete-event" },
                // { name: "Attendance List", path: "/attendance-list" }
            ]} />
            <LogoutBtn />
        </>
    );
}

export default EditEvent;