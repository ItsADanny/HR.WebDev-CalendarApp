import { Link } from 'react-router-dom';

function Home() {
    return (
      <>
          <h1>Welcome to the Team Orange Calendar!</h1>
          <p>This is the main landing page of our application.</p>
          <Link to="/login">Go to Login Page</Link>
          <br />
          <Link to="/register">Go to Register Page</Link>
          <br />
          <Link to="/book-a-room">Book a room!</Link>
          <br />
          <Link to="/attending">Attending Page</Link>
      </>
    )
}

export default Home;