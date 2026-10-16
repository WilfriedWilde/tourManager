import { useState } from "react"
import { login } from "../../api/users";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router";
import "./loginform.css"

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { setUser } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const user = await login(email, password);
            setUser(user);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <form id="login-form" onSubmit={handleSubmit}>
            <h2 className="form-header">login</h2>
            <div className="form-inputs-container">
                <div className="form-section">
                    <label htmlFor="email">email</label>
                    <input value={email} id="email" type="email" autoComplete="email" placeholder="enter email here..." onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="form-section">
                    <label htmlFor="password">password</label>
                    <input value={password} id="password" type="password" autoComplete="current-password" placeholder="enter password here..." onChange={(e) => setPassword(e.target.value)} required/>
                </div>
            </div>
            {error && <p className="form-error">{error}</p>}
            <button type="submit" className="submit-btn" id="login-form-btn">login</button>
        </form>
    )
}