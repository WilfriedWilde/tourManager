import { useId } from "react";
import "./inputform.css";

export default function InputForm({ type, value, handleOnChange }) {
  const id = useId();

  return (
    <div className="form-section">
      <label htmlFor={`${type}-${id}`}>{type}</label>
      <input
        value={value}
        id={`${type}-${id}`}
        type={type === "username" ? "text" : type}
        autoComplete={type === "password" ? type : "off"}
        placeholder={`enter ${type}`}
        onChange={(e) => handleOnChange(e.target.value)}
        required
      />
    </div>
  );
}
