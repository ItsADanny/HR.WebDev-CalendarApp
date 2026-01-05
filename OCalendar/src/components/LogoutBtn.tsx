import '../stylesheets/LogoutBtn.css';

function LogoutBtn() {
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.href = '/login';
    }

    return (
        <button className="logout-btn" onClick={handleLogout}>
            Logout
        </button>
    );
}

export default LogoutBtn;