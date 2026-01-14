import OrangeLogo from '../assets/Orange.png'
import '../stylesheets/Login.css'

import { useState }  from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();

    //Before doing anything, Check to see if the user is already logged in
    if (localStorage.getItem('token') !== null || '') {
        if (localStorage.getItem('adminPanelAccess') === '1') {
            navigate('/admin-dashboard');
        } else {
            navigate('/calendar');
        }
    }

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
            
            //Added this so that we can retrieve the users role so we can see which permission they have
            const responseUser = await fetch(`http://localhost:5050/User/${data.userId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json", 'Authorization':`${data.token}` }
            });

            const userData = await responseUser.json();

            if (!responseUser.ok) {
                setError(userData.message || "Failed to fetch user data");
                return;
            }

            const responseRole = await fetch(`http://localhost:5050/Role/${userData.roleId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json", 'Authorization':`${data.token}` }
            });

            const roleData = await responseRole.json();

            if (!responseRole.ok) {
                setError(roleData.message || "Failed to fetch user role");
                return;
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('adminPanelAccess', roleData.allowedInAdminPanel);

            if (roleData.allowedInAdminPanel === 1) {
                navigate('/admin-dashboard');
            } else {
                navigate('/calendar');
            }
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