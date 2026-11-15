import { useId } from "react";
import "./inputform.css";

export default function InputForm({
  inputType,
  formType,
  value,
  validation,
  handleOnChange,
}) {
  const id = `${inputType}-${useId()}`;
  const minLengths = {
    username: formType === "register" ? 2 : undefined,
    password: formType === "register" ? 8 : undefined,
  };
  const maxLengths = {
    username: formType === "register" ? 50 : undefined,
    password: formType === "register" ? 64 : undefined,
  };
  const autoCompletes = {
    username: "username",
    email: "email",
    password: formType === "register" ? "new-password" : "current-password",
  };
  const showValidation = inputType === "password" && formType === "register";

  return (
    <div className="form-section">
      <label htmlFor={id}>{inputType}</label>
      <input
        value={value}
        id={id}
        type={inputType === "username" ? "text" : inputType}
        minLength={minLengths[inputType]}
        maxLength={maxLengths[inputType]}
        autoComplete={autoCompletes[inputType]}
        placeholder={`enter ${inputType}`}
        onChange={(e) => handleOnChange(e.target.value)}
        required
      />
      <div className={`invalid-password ${showValidation ? "show" : ""}`}>
        <p className={validation && !validation.letter ? "show" : ""}>
          should contain a letter
        </p>
        <p className={validation && !validation.digit ? "show" : ""}>
          should contain a digit
        </p>
      </div>
    </div>
  );
}
