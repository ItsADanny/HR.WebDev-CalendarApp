import { useState, useEffect } from "react";
import "./css/AdminForms.css";

interface Event {
    id: number;
    title: string;
    description: string;
    fromDateTime: string;
    untilDateTime: string;
}

function EditEvent({ event, onEventUpdated }: { event: Event; onEventUpdated: (event: Event) => void }) {
    const [message, setMessage] = useState("");

    const [form, setForm] = useState({
        title: "",
        description: "",
        fromDateTime: "",
        untilDateTime: ""
    });

    useEffect(() => {
        if (event) {
            setForm({
                title: event.title,
                description: event.description,
                fromDateTime: event.fromDateTime,
                untilDateTime: event.untilDateTime
            });
        }
    }, [event]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.title || !form.fromDateTime || !form.untilDateTime) return;

        try {
            const response = await fetch(`http://localhost:5050/Event/${event.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem("token")}`
                },
                body: JSON.stringify(form)
            });

            const eventData = await response.json();
            if (!response.ok) throw new Error("Failed to update event");

            onEventUpdated(eventData);
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
        </div>
    );
}

export default EditEvent;