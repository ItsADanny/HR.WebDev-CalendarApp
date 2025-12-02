import { Route, Routes } from 'react-router-dom'
import './stylesheets/App.css'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import NavbarLoggedIn from './components/NavbarLoggedIn.tsx'
import Calendar from './pages/Calendar.tsx'
import Attending from './pages/Attending.tsx'
import BookaRoom from './pages/BookaRoom.tsx'
import UpdateRoom from './pages/UpdateRoom.tsx'
import Register from './pages/Register.tsx'


function App() {
  const isLoggedIn = true; // nog authentication logic hier

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/attending" element={<Attending />} />

        <Route path="/book-a-room" element={<BookaRoom />} />
      </Routes>
      { isLoggedIn ? <NavbarLoggedIn /> : null }
    </>
  )
}

export default App
