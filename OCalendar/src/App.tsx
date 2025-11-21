import { Route, Routes } from 'react-router-dom'
import './stylesheets/App.css'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Navbar from './components/Navbar.tsx'
import NavbarLoggedIn from './components/NavbarLoggedIn.tsx'
import Calendar from './pages/Calendar.tsx'
import Attending from './pages/Attending.tsx'
import BookaRoom from './pages/BookaRoom.tsx'
import NewRoom from './pages/NewRoom.tsx'
import UpdateRoom from './pages/UpdateRoom.tsx'


function App() {
  const isLoggedIn = false; // nog authentication logic hier
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/attending" element={<Attending />} />

        <Route path="/book-a-room" element={<BookaRoom />} />
        <Route path="/book-a-room/new-room" element={<NewRoom />} />
        <Route path="/book-a-room/update-booking" element={<UpdateRoom />} />
      </Routes>
      { isLoggedIn ? <NavbarLoggedIn /> : <Navbar /> }
    </>
  )
}

export default App
