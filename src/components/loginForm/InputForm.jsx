import { useId } from "react";
import "./inputform.css";

export default function InputForm({
  inputType,
  formType,
  value,
  handleOnChange,
}) {
  const id = `${inputType}-${useId()}`;
  const minLengths = {
    username: formType === "login" ? 2 : undefined,
    password: formType === "login" ? 8 : undefined,
  };
  const maxLengths = {
    username: formType === "login" ? 50 : undefined,
    password: formType === "login" ? 64 : undefined,
  };
  const autoCompletes = {
    username: "username",
    email: "email",
    password: formType === "register" ? "new-password" : "current-password",
  };

  return (
    <div className="form-section">
      <label htmlFor={id}>{inputType}</label>
      <input
        value={value}
        id={id}
        type={type === "username" ? "text" : inputType}
        minLength={minLengths[inputType]}
        maxLength={maxLengths[inputType]}
        autoComplete={autoCompletes[inputType]}
        placeholder={`enter ${inputType}`}
        onChange={(e) => handleOnChange(e.target.value)}
        required
      />
    </div>
  );
}
