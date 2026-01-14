import '../stylesheets/LogoutBtn.css';

function LogoutBtn() {
    const handleLogout = async () => {
        const response = await fetch("http://localhost:5050/auth/Logout", {
                method: "PUT",
                headers: { "Content-Type": "application/json", "Authorization":`${localStorage.getItem('token')}` },
            });

            const data = await response.json();

            if (!response.ok) {
                console.log(data.message || "Logout failed");
                return;
            }

        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('adminPanelAccess');

        window.location.href = '/login';
    }

    return (
        <button className="logout-btn" onClick={handleLogout}>
            Logout
        </button>
    );
}

export default LogoutBtn;