import { useState } from "react"
import "./loginform.css"
import { login } from "../../api/users";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const user = await login(email, password);
            setUser(user);
            console.log(user)
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
                    <input value={email} id="email" type="email" placeholder="enter email here..." onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div className="form-section">
                    <label htmlFor="password">email</label>
                    <input value={password} id="password" type="password" placeholder="enter password here..." onChange={(e) => setPassword(e.target.value)} required/>
                </div>
            </div>
            <button type="submit" className="submit-btn" id="login-form-btn">login</button>
        </form>
    )
}