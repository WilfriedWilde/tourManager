import { Link, Navigate, useNavigate } from "react-router"
import { useAuth } from "../AuthContext";
import { logout } from "../../api/users";
import "./navbar.css"

export default function Navbar() {
    const { setUser } = useAuth()
    const navigate = useNavigate();

    async function handleLogout(e) {
        e.preventDefault();

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
            <div className="navbar-section">
                <Link to="/signup" className="log-btn">signup</Link>
                <Link to="/login" className="log-btn">login</Link>
                <form onClick={handleLogout}>
                    <button type="submit">logout</button>
                </form>
            </div>
        </nav>
    )
}