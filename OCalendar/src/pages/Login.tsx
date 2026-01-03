import OrangeLogo from '../assets/Orange.png'
import '../stylesheets/Login.css'

import { useState }  from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/authService';

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            await authService.login(username, password);
            navigate("/home", {replace: true});
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
                        placeholder="Username" 
                        name="username"
                        value = {username}
                        onChange = {(e) => setUsername(e.target.value)}
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