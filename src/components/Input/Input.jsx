import React from "react";
import PropTypes from "prop-types";
import "./Input.css";
import { Label } from "../Label/Label";

export const Input = ({
  label,
  type,
  value,
  placeholder,
  error,
  onChange,
  ...props
}) => {
  return (
    <div className={`input ${error !== "" ? "input--error" : ""}`} {...props}>
      {label !== "" && (
        <Label
          size="xs"
          variant="base"
          className="input__label"
          htmlFor={label}
        >
          {label}
        </Label>
      )}
      <input
        id={label}
        className="input__input"
        type={type}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
      {error !== "" && <p className="input__error">{error}</p>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  label: "",
  type: "text",
  placeholder: "",
  error: "",
  onChange: undefined,
};
