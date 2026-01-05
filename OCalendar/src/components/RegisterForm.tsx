import { useState } from "react";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("http://localhost:5050/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, firstName, lastName })  // <-- send email
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Something went wrong");
        return;
      }

      setMessage(data.message);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
    } catch (err) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required />
        <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" required />
        <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" required />
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RegisterForm;
