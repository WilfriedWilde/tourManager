import { useState, useEffect } from "react"
import "./login.css"
import { METHODS } from "http";
import { json } from "node:stream/consumers";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        fetch("/api/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
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