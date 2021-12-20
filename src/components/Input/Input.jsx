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
  disabled,
  ...props
}) => {
  return (
    <div className={`input ${error !== "" ? "input--error" : ""}`} {...props}>
      {label !== "" && (
        <Label
          size="xs"
          variant="base"
          className="input__label"
          htmlFor={label ? label : "input-id"}
        >
          {label}
        </Label>
      )}
      <input
        disabled={disabled}
        id={label ? label : "input-id"}
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
  /**
   * input label
   */
  label: PropTypes.string,
  /**
   * input type
   */
  type: PropTypes.string,
  /**
   * display placeholder when value is empty
   */
  placeholder: PropTypes.string,
  /**
   * value of the input
   */
  value: PropTypes.string,
  /**
   * error message
   */
  error: PropTypes.string,
  /**
   * on value change handler
   */
  onChange: PropTypes.func,
  /**
   * disable the input
   */
  disabled: PropTypes.bool,
};

Input.defaultProps = {
  label: "",
  type: "text",
  placeholder: "",
  error: "",
  onChange: undefined,
  disabled: false,
};
