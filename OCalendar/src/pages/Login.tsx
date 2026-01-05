import OrangeLogo from '../assets/Orange.png'
import '../stylesheets/Login.css'

import { useState }  from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch("http://localhost:5050/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Login failed");
                return;
            }
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);

            navigate('/calendar');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-logo">
                    <img src={OrangeLogo} alt="Orange brand logo" />
                </div>
                <h2>OCalendar</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        className="login-input-field" 
                        type="text" 
                        placeholder="Email" 
                        name="email"
                        value = {email}
                        onChange = {(e) => setEmail(e.target.value)}
                        required
                    />

                    <input 
                        className="login-input-field" 
                        type="password" 
                        placeholder="Password" 
                        name="password" 
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="login-button">Login</button>

                    {error && <p className="login-error-message">{error}</p>}

                </form>
                <footer>OCalendar - Orange - Copyright 2025</footer>
            </div>
        </div>
    );
}

export default Login;