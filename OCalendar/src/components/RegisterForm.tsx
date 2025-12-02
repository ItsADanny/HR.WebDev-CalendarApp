import { useState } from 'react';

function RegisterForm() {
    const [name, setName] = useState('');

    function handleChange(e : React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
    }

    function handleSubmit(e : React.FormEvent) {
        e.preventDefault();
        alert(`Registered with name: ${name}`);
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="text" placeholder='Username' value={name} onChange={handleChange} />
                </label>
                <br />
                <label>
                    <input type="email" placeholder='Email' />
                </label>
                <br />
                <label>
                    <input type="password" placeholder='Password' />
                </label>
                <br />
                <input type="submit" value="Register" />
            </form>

             <p>Current value: {name}</p>
        </div>
    );
}
export default RegisterForm;