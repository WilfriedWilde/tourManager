import { useState } from "react";
import { login, register } from "../../api/users";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router";
import "./authform.css";
import InputForm from "./InputForm";

export default function AuthForm(formType) {
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
        formType === "login"
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

      {formType === "register" && (
        <InputForm
          inputType="username"
          formType={formType}
          value={username}
          handleOnChange={handleUsernameChange}
        />
      )}
      <InputForm
        inputType="email"
        formType={formType}
        value={email}
        handleOnChange={handleEmailChange}
      />
      <InputForm
        inputType="password"
        formType={formType}
        value={password}
        handleOnChange={handlePasswordChange}
      />
      {error && <p className="form-error">{error}</p>}
      <button type="submit" className="submit-btn" id="login-form-btn">
        login
      </button>
    </form>
  );
}
