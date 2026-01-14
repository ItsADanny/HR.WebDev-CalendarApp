import { useEffect, useState } from 'react';
import LogoutBtn from '../LogoutBtn';
import NavbarLoggedIn from '../NavbarLoggedIn';
import { useNavigate } from 'react-router-dom';

interface Event {
    id: number;
    title: string;
    description: string;
    fromDateTime: string;
    untilDateTime: string;
}

function DeleteEvent() {
    if (localStorage.getItem('adminPanelAccess') !== '1') {
        const navigate = useNavigate();
        navigate('/calendar');
    }

    const [events, setEvents] = useState<Event[]>([]);
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

    const handleDeleteEvent = async (eventId: number, eventTitle: string) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete "${eventTitle}"?`);
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5050/Event/${eventId}`, {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete event');
            }

            // Remove event from list
            setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
            alert('Event deleted successfully');
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Error deleting event. Please try again later.');
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <div style={{ padding: '20px' }}>
                <div className="events-container">
                    <h2>Events ({events.length})</h2>
                    {events.length === 0 ? (
                        <p>No events</p>
                    ) : (
                        <div>
                            {events.map(event => (
                                <div key={event.id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '5px' }}>
                                    <h3>{event.title}</h3>
                                    <p><strong>ID:</strong> {event.id}</p>
                                    <p><strong>Description:</strong> {event.description}</p>
                                    <p><strong>From:</strong> {new Date(event.fromDateTime).toLocaleString()}</p>
                                    <p><strong>Until:</strong> {new Date(event.untilDateTime).toLocaleString()}</p>
                                    <button 
                                        onClick={() => handleDeleteEvent(event.id, event.title)}
                                        style={{ 
                                            padding: '8px 16px', 
                                            backgroundColor: '#dc3545', 
                                            color: 'white', 
                                            border: 'none', 
                                            borderRadius: '4px', 
                                            cursor: 'pointer' 
                                        }}
                                    >
                                        Delete Event
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
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

export default DeleteEvent;