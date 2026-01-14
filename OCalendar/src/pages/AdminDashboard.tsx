import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutBtn from '../components/LogoutBtn';
import NavbarLoggedIn from '../components/NavbarLoggedIn';

function AdminDashboard() {

    return (
        <>
            <h1>Admin Dashboard</h1>
            <p>Welcome to the Admin Dashboard. Here you can manage the application settings and user permissions.</p>
            {/* NOTE ITSDANNY: NavLinks have been replaced with NavbarLoggedIn component */}
            {/* <nav>
                <ul style={{ listStyle: 'none', display: 'flex', gap: '20px' }}>
                    <NavLink to="/all-events" className="nav-link">All Events</NavLink>
                    <NavLink to="/new-event" className="nav-link">Create New Event</NavLink>
                    <NavLink to="/edit-event" className="nav-link">Edit Event</NavLink>
                    <NavLink to="/delete-event" className="nav-link">Delete Event</NavLink>
                    <NavLink to="/attendance-list" className="nav-link">Attendance List</NavLink>
                </ul>
            </nav> */}
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

export default AdminDashboard;
