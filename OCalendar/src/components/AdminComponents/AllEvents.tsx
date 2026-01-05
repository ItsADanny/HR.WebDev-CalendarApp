import { useEffect, useState } from 'react';


function AllEvents() {
    const [events, setEvents] = useState([]);
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
    );
}

export default AllEvents;