import { Route, Routes, Navigate } from 'react-router-dom';
import './stylesheets/App.css';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import NavbarLoggedIn from './components/NavbarLoggedIn.tsx';
import Calendar from './pages/Calendar.tsx';
import Attending from './pages/Attending.tsx';
import BookaRoom from './pages/BookaRoom.tsx';
import UpdateRoom from './pages/UpdateRoom.tsx';
import Register from './pages/Register.tsx';
import BookaNewRoom from './pages/BookaNewRoom.tsx';
import type { ReactNode } from 'react';
import AdminDashboard from './pages/AdminDashboard.tsx';
import AllEvents from './components/AdminComponents/AllEvents.tsx';
import CreateNewEvent from './components/AdminComponents/CreateNewEvent.tsx';
import DeleteEvent from './components/AdminComponents/DeleteEvent.tsx';
import EditEvent from './components/AdminComponents/EditEvent.tsx';
import AttendanceList from './components/AdminComponents/AttendanceList.tsx';
import { useEffect, useState } from 'react';
import LogoutBtn from './components/LogoutBtn.tsx';

type ProtectedRouteProps = {
  children: ReactNode
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { children } = props;
  const isAuthenticated = localStorage.getItem('token')
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };

    //Check auth on mount
    checkAuth();

    //Listen for storage changes (e.g., from other tabs)
    window.addEventListener('storage', checkAuth);

    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calendar" element={<ProtectedRoute> <Calendar /> </ProtectedRoute>} />
        <Route path="/attending" element={<ProtectedRoute> <Attending /> </ProtectedRoute>} />
        <Route path="/attending/:eventId" element={<ProtectedRoute> <Attending /> </ProtectedRoute>} />

        <Route path="/book-a-room" element={<ProtectedRoute> <BookaRoom /> </ProtectedRoute>} />
        <Route path="/book-new-room" element={<ProtectedRoute> <BookaNewRoom /> </ProtectedRoute>} />
        <Route path="/update-room" element={<ProtectedRoute> <UpdateRoom /> </ProtectedRoute>} />

        <Route path="/admin-dashboard" element={<ProtectedRoute> <AdminDashboard /> </ProtectedRoute>} />
        <Route path="/all-events" element={<ProtectedRoute> <AllEvents /> </ProtectedRoute>} />
        <Route path="/new-event" element={<ProtectedRoute> <CreateNewEvent /> </ProtectedRoute>} />
        <Route path="/edit-event" element={<ProtectedRoute> <EditEvent /> </ProtectedRoute>} />
        <Route path="/delete-event" element={<ProtectedRoute> <DeleteEvent /> </ProtectedRoute>} />
        <Route path="/attendance-list" element={<ProtectedRoute> <AttendanceList /> </ProtectedRoute>} />
      </Routes>

      {/* NOTE ITSDANNY: This has been disabled, as it didn't work reliably.
      The navbar and logout button are now included in the pages themselves */}
      {/* { isLoggedIn ? <NavbarLoggedIn /> : null } */}
      {/* { isLoggedIn ? <LogoutBtn /> : null } */}
    </>
  )
}

export default App
