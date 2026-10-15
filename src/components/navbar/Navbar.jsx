import { Link } from "react-router"

export default function Navbar() {
    return (
        <nav id="navbar">
            <div className="navbar-section">
                <Link to="/signup" className="log-btn">signup</Link>
                <Link to="/login" className="log-btn">login</Link>
                <Link to="/logout" className="log-btn">logout</Link>
            </div>
        </nav>
    )
}