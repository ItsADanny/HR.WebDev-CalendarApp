// import { useState, useEffect} from 'react';

// function Counter() {
//   const [count, setCount] = useState(0);
//   const [calculation, setCalculation] = useState(0);

//   useEffect(() => {
//     setCalculation(() => count * 3);
//   }, [count]); // <- add the count variable here

//   return (
//     <>
//       <p>Count: {count}</p>
//       <button onClick={() => setCount((c) => c + 1)}>+</button>
//       <p>Calculation: {calculation}</p>
//     </>
//   );
// }

// function Counter() {
//     // If counter key exists return that, else init counter to zero
//     const [counter, setCounter] = useState<number>(() => {
//         const count = localStorage.getItem("counter");
//         return count ? Number(count) : 0;
//     });

//     // Runs everytime counter changes
//     useEffect(() => {
//         localStorage.setItem('counter', counter.toString());
//         console.log("Runs when the component mounts, and again for every counter update")
//     }, [counter]);

//     useEffect(() => {console.log("Runs when the component mounts")}, [])

//     return (
//         <div>
//             <h1>Counter</h1>
//             Counter: {counter}
//             <input value="increment" type="button" onClick={ () => setCounter(counter + 1) }/>
//             <input value="decrement" type="button" onClick={ () => setCounter(counter - 1) }/>
//         </div>
//     )
// }

// function Timer() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     let timer = setTimeout(() => {
//       setCount((count) => count + 1);
//     }, 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   return <h1>I've rendered {count} times!</h1>;
// }

// function MyForm() {
//   return (
//     <form>
//       <label>Enter your name:
//         <input type="text" />
//       </label>
//     </form>
//   )
// }

import { useState } from 'react';

function MyForm() {
  const [name, setName] = useState("");

  function handleChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(`The name you entered was: ${name}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter your name:
        <input
          type="text" 
          value={name}
          onChange={handleChange}
        />
      </label>
      <input type="submit" />
      <p>Current value: {name}</p>
    </form>
  )
}

function Home() {
    return (
        <div>
            <h2>Home Page</h2>
            <p>Welcome to the OCalendar application! Please log in to access your calendar.</p>
            <p>This is a placeholder for the Home page content.</p>
            {/* <Counter />
            <Timer /> */}
            <MyForm />
        </div>
    )
}

export default Home;