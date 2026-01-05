import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm.tsx";
import '../stylesheets/Register.css';

function Register() {
    return (
        <div>
            <h1>Register Page</h1>
            <p>Please fill in the form to create an account.</p>
            <div className="register-form">
                <RegisterForm />
            </div>

            <Link to="/">Back to Home</Link>
        </div>
    );
}
export default Register;