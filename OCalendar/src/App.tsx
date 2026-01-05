import { Route, Routes, Navigate } from 'react-router-dom'
import './stylesheets/App.css'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import NavbarLoggedIn from './components/NavbarLoggedIn.tsx'
import Calendar from './pages/Calendar.tsx'
import Attending from './pages/Attending.tsx'
import BookaRoom from './pages/BookaRoom.tsx'
import UpdateRoom from './pages/UpdateRoom.tsx'
import Register from './pages/Register.tsx'
import BookaNewRoom from './pages/BookaNewRoom.tsx'
import type { ReactNode } from 'react'

type ProtectedRouteProps = {
  children: ReactNode
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { children } = props;
  const isAuthenticated = localStorage.getItem('token')
  return isAuthenticated ? children : <Navigate to="/login" />
}

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route 
          path="/calendar" 
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          } 
        />

        <Route path="/attending" element={<Attending />} />

        <Route path="/book-a-room" element={<BookaRoom />} />
        <Route path="/book-new-room" element={<BookaNewRoom />} />
        <Route path="/update-room" element={<UpdateRoom />} />

        <Route path="/admin-panel" element={<AdminDashboard />} />

        <Route path="*" element={<h1>404: Page Does not exist</h1>} />
      </Routes>
      <NavbarLoggedIn />
    </>
  )
}

export default App
