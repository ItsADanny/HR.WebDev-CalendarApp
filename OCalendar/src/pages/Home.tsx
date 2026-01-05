import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
      <>
          <h1>Welcome to the Team Orange Calendar!</h1>
          <p>This is the main landing page of our application.</p>

          <HomeCounter />

          <Link to="/login">Go to Login Page</Link>
          <br />
          <Link to="/register">Go to Register Page</Link>
          <br />
          <Link to="/admin-dashboard">Admin Dashboard</Link>

      </>
    )
}

export default Home;

function HomeCounter() {
  const [counter, setCounter] = useState<number>(() => {
    const count = localStorage.getItem('counter');
    return count ? Number(count) : 0;
  });

  useEffect(() => {
    localStorage.setItem('counter', counter.toString());
  }, [counter]);

  return (
    <div>
      <h1>Orange Count: {counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <button onClick={() => setCounter(counter - 1)}>Decrement</button>

    </div>
  )
}