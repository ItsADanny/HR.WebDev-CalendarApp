import { useEffect, useState } from 'react';
import LogoutBtn from '../LogoutBtn';
import NavbarLoggedIn from '../NavbarLoggedIn';
import { useNavigate } from 'react-router-dom';
import type { CalendarEvent } from '../../types/CalendarEvent';

function AllEvents() {
    if (localStorage.getItem('adminPanelAccess') !== '1') {
        const navigate = useNavigate();
        navigate('/calendar');
    }

    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [loading, setLoading] = useState(true);

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
                
                const data = await response.json();

                setEvents(Array.isArray(data) ? data : data.events || []);
            } catch (err) {
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchEvents();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <div>
                <h2>Events</h2>
                {events.length === 0 ? (
                    <p>No events</p>
                ) : (
                    <ul>
                        {events.map(event => (
                            <li key={event.id}> <strong>{event.title}</strong> | {event.description}</li>
                        ))}
                    </ul>
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

export default AllEvents;