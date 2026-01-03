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
import authService from './services/authService.ts';


function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
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

        <Route path="*" element={<h1>404: Page Does not exist</h1>} />
      </Routes>
      { authService.isAuthenticated() ? <NavbarLoggedIn /> : null }
    </>
  )
}

export default App
