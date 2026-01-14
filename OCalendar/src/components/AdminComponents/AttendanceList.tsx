import { useEffect, useState } from 'react';
import NavbarLoggedIn from '../NavbarLoggedIn';
import LogoutBtn from '../LogoutBtn';
import { useNavigate } from 'react-router-dom';

interface Event {
    id: number;
    title: string;
    description: string;
}

interface Attendance {
    id: number;
    userId: number;
    eventId: number;
    attending: boolean;
}

interface User {
    id: number;
    name: string;
}

function AttendanceList() {
    if (localStorage.getItem('adminPanelAccess') !== '1') {
        const navigate = useNavigate();
        navigate('/calendar');
    }

    const [events, setEvents] = useState<Event[]>([]);
    const [attendanceMap, setAttendanceMap] = useState<Map<number, Attendance[]>>(new Map());
    const [userMap, setUserMap] = useState<Map<number, User>>(new Map());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all events
                const eventsRes = await fetch('http://localhost:5050/Event', {
                    headers: { Authorization: `${localStorage.getItem('token')}` }
                });
                const eventsData = await eventsRes.json();
                const eventsList = Array.isArray(eventsData) ? eventsData : [];
                setEvents(eventsList);

                // Fetch all users
                const usersRes = await fetch('http://localhost:5050/User', {
                    headers: { Authorization: `${localStorage.getItem('token')}` }
                });
                const usersData = await usersRes.json();
                const users = new Map();
                usersData.forEach((user: User) => users.set(user.id, user));
                setUserMap(users);

                // Fetch attendance for each event
                const attendance = new Map();
                for (const event of eventsList) {
                    try {
                        const attendanceRes = await fetch(`http://localhost:5050/EventAttendace/${event.id}`, {
                            headers: { Authorization: `${localStorage.getItem('token')}` }
                        });
                        if (attendanceRes.ok) {
                            const attendanceData = await attendanceRes.json();
                            attendance.set(event.id, Array.isArray(attendanceData) ? attendanceData : [attendanceData]);
                        }
                    } catch (err) {
                        console.error(`Failed to fetch attendance for event ${event.id}:`, err);
                    }
                }
                setAttendanceMap(attendance);
            } catch (err) {
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <>
        <div>
            <h2>Attendance List</h2>
            {events.map(event => {
                const eventAttendance = attendanceMap.get(event.id) || [];
                const attendees = eventAttendance
                    .filter(a => a.attending)
                    .map(a => userMap.get(a.userId))
                    .filter(Boolean);

                return (
                    <div key={event.id}>
                        <h3>{event.title}</h3>
                        <p>Attendees: {attendees.length}</p>
                        <div>
                            {attendees.map(user => (
                                <button key={user?.id}>{user?.name}</button>
                            ))}
                        </div>
                    </div>
                );
            })}
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

export default AttendanceList;