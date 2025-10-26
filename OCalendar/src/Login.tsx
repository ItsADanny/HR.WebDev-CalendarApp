import OrangeLogo from './assets/Orange.png'
import './stylesheets/Login.css'

function Login() {
    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-logo">
                    <img src={OrangeLogo} alt="Orange brand logo" />
                </div>
                <h2>OCalendar</h2>
                <form>
                    <input className="login-input-field" type="text" placeholder="Username" name="username" />
                    <input className="login-input-field" type="password" placeholder="Password" name="password" />
                    <button type="submit" className="login-button">Login</button>
                </form>
                <footer>OCalendar - Orange - Copyright 2025</footer>
            </div>
        </div>
    );
}

export default Login;