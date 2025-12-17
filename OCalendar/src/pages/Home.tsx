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
          <Link to="/book-a-room">Book a room!</Link>
          <br />
          <Link to="/attending">Attending Page</Link>

          <HomeTimer />
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

  const [color, setColor] = useState<string>('orange');

  return (
    <div>
      <h1>Orange Count: {counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>Increment</button>
      <button onClick={() => setCounter(counter - 1)}>Decrement</button>
      <button 
        type="button" 
        onClick={() => setColor(color === 'orange' ? 'blue' : 'orange')}
        style={{backgroundColor: color}}
      >Toggle Color</button>
    </div>
  )
}

function HomeTimer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);
  });
  return <h1>I've rendered {count} times!</h1>;
}