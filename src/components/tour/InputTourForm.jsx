import { useId } from "react";

export default function InputTourForm({
  inputType,
  label,
  value,
  handleOnChange,
  min,
  max,
}) {
  const id = `${inputType}-${useId()}`;

  return (
    <div className="tour-form-section">
      <label htmlFor={id}>{label}</label>
      <input
        value={value}
        id={id}
        type={inputType}
        minLength={inputType === "text" ? min : ""}
        maxLength={inputType === "text" ? max : ""}
        min={inputType === "date" ? min : ""}
        max={inputType === "date" ? max : ""}
        placeholder={`enter ${label} name`}
        required
        onChange={(e) => handleOnChange(e.target.value)}
      />
    </div>
  );
}
