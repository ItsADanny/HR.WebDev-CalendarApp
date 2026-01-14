import { useState } from "react";
import "./css/AdminForms.css";
import LogoutBtn from "../LogoutBtn";
import NavbarLoggedIn from "../NavbarLoggedIn";

function CreateNewEvent({ onEventCreated }: { onEventCreated: (event: any) => void }) {
    const [message, setMessage] = useState("");

    const [form, setForm] = useState({
        title: "",
        description: "",
        fromDateTime: "",
        untilDateTime: "",
    });



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.title || !form.fromDateTime || !form.untilDateTime) return;

        try {
            const response = await fetch("http://localhost:5050/Event", {
                method: "POST",
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

            const eventData = await response.json();
            if (!response.ok) throw new Error("Failed to create event");

            onEventCreated(eventData);
            setForm({ title: "", description: "", fromDateTime: "", untilDateTime: "",  });
            setMessage("Event created successfully!");
        } catch (err) {
            console.error(err);
            setMessage("Error creating event");
        }
    };

    return (
        <>
            <div className="new-event-card">
                <h1>Create New Event</h1>
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

                    <button type="submit">Create Event</button>

                    {message && <p>{message}</p>}
                </form>
            </div>
            <NavbarLoggedIn navbarItems={[
                { name: "All Events", path: "/all-events" },
                { name: "Create New Event", path: "/new-event" },
                { name: "Edit Event", path: "/edit-event" },
                { name: "Delete Event", path: "/delete-event" },
                { name: "Attendance List", path: "/attendance-list" }
            ]} />
            <LogoutBtn />
        </>
    );
}

export default CreateNewEvent;