import React from "react";
import PropTypes from "prop-types";
import "./Input.css";
import { Label } from "../Label/Label";

export const Input = ({ label, placeholder, error, onChange, ...props }) => {
  return (
    <div className={`input ${error !== "" ? "input--error" : ""}`} {...props}>
      {label !== "" && (
        <Label size="xs" variant="base" className="input__label">
          {label}
        </Label>
      )}
      <input
        className="input__input"
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {error !== "" && <p className="input__error">{error}</p>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  label: "",
  placeholder: "",
  error: "",
  onChange: undefined,
};
