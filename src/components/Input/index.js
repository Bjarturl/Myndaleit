import React from "react";
import PropTypes from "prop-types";

// Process custom properties of an input field
const Input = ({
  value,
  onInput,
  type,
  errorMessage,
  label,
  name,
  htmlId,
  placeholder,
  onEnter,
}) => (
  <div className="form-group">
    {/* Optional label on top of input */}
    {label ? (
      <label htmlFor={htmlId} className="control-label">
        {label}
      </label>
    ) : (
      <></>
    )}
    <input
      type={type}
      placeholder={placeholder}
      value={value || ""}
      onChange={onInput}
      name={name}
      id={htmlId}
      className="form-control"
      onKeyDown={(e) => {
        if (e.key == "Enter" && onEnter) {
          onEnter();
        }
      }}
    />
    <span className="error">{errorMessage}</span>
  </div>
);

//Prop validation
Input.propTypes = {
  value: PropTypes.string,
  onInput: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["text", "password", "submit", "email", "number"]),
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  htmlId: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onEnter: PropTypes.func,
};

export default Input;
