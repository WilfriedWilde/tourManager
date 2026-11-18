import { useState } from "react";
import { login, register } from "../../api/users";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router";
import "./authform.css";
import InputForm from "./InputForm";

export default function AuthForm({ formType, selected }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const validPassword = validatePassword(password);
  const [error, setError] = useState(null);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  function handleUsernameChange(newUsername) {
    setUsername(newUsername);
  }

  function handleEmailChange(newEmail) {
    setEmail(newEmail.trim());
  }

  function handlePasswordChange(newPassword) {
    setPassword(newPassword);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      const user =
        formType === "login"
          ? await login({ email, password })
          : await register({ username, email, password });
      setUser(user);
      navigate("/");
    } catch (err) {
      setError(err);
    }
  }

  return (
    <form
      className={`auth-form ${formType}-form ${selected ? "show" : ""}`}
      onSubmit={handleSubmit}
    >
      {formType === "login" ? (
        <h2 className="authform-title">Welcome back</h2>
      ) : (
        <h2 className="authform-title">Create your account</h2>
      )}

      <div className="form-inputs-container">
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
          validation={validPassword}
          handleOnChange={handlePasswordChange}
        />
      </div>
      <p className={`form-error ${error ? "show" : ""}`}>{error?.message}</p>
      <button type="submit" className="submit-btn">
        {formType}
      </button>
    </form>
  );
}

function validatePassword(password) {
  const letter = [...password].some((c) => {
    const code = c.toLowerCase().charCodeAt(0);
    return code >= 97 && code <= 122;
  });
  const digit = [...password].some((c) => {
    const code = c.charCodeAt(0);
    return code >= 48 && code <= 57;
  });

  return {
    valid: letter && digit,
    letter,
    digit,
  };
}
