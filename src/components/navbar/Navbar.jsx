import { Link, Navigate, useNavigate } from "react-router"
import { useAuth } from "../AuthContext";
import { logout } from "../../api/users";
import "./navbar.css"

export default function Navbar() {
    const { user, setUser } = useAuth()
    const navigate = useNavigate();

    async function handleLogout() {
        try {
            await logout();
            setUser(null);
            navigate("/");
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <nav id="navbar">
            <h1>Tourwise</h1>
            <div className="navbar-section">
                {user ?(
                    <>
                        <p className="user-name">{user.username}</p>
                        <button className="btn-logout" onClick={handleLogout}>logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/signup" className="log-btn">signup</Link>
                        <Link to="/login" className="log-btn">login</Link>
                    </>
                )}
            </div>
        </nav>
    )
}