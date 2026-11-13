import { useState } from "react";
import { login, register } from "../../api/users";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router";
import "./authform.css";

export default function AuthForm(type) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  function handleUsernameChange(newUsername) {
    setUsername(newUsername.trim());
  }

  function handleEmailChange(newEmail) {
    setEmail(newEmail.trim());
  }

  function handlePasswordChange(newPassword) {
    setUsername(newPassword.trim());
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const user =
        type === "login"
          ? await login({ email, password })
          : await register({ username, email, password });
      setUser(user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form id="auth-form" onSubmit={handleSubmit}>
      {type === "login" ? (
        <h2 className="authform-title">Welcome back</h2>
      ) : (
        <h2 className="authform-title">Create your account</h2>
      )}

      <div className="form-inputs-container">
        <div className="form-section">
          <label htmlFor="email">email</label>
          <input
            value={email}
            id="email"
            type="email"
            autoComplete="email"
            placeholder="enter email here..."
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-section">
          <label htmlFor="password">password</label>
          <input
            value={password}
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="enter password here..."
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>
      {error && <p className="form-error">{error}</p>}
      <button type="submit" className="submit-btn" id="login-form-btn">
        login
      </button>
    </form>
  );
}
