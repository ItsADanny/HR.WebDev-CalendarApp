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


function App() {
  const isLoggedIn = true; // nog authentication logic hier
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/attending" element={<Attending />} />

        <Route path="/book-a-room" element={<BookaRoom />}>
          <Route path="new-room" element={<NewRoom />} />
          <Route path="new-room" element={<NewRoom />} />
        </Route>
      </Routes>
      { isLoggedIn ? <NavbarLoggedIn /> : <Navbar /> }
    </>
  )
}

export default App
