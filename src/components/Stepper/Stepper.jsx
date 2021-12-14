import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Stepper.css";
import { RiSubtractFill, RiAddFill } from "react-icons/ri";

export const Stepper = ({ unit, min, max, initValue, onChange, ...props }) => {
  const [value, setValue] = useState(min || 1);

  useEffect(() => {
    onChange(value);
  }, [value]);

  function increase() {
    if (value < max) setValue((currentValue) => currentValue + 1);
  }
  function decrease() {
    if (value > min) setValue((currentValue) => currentValue - 1);
  }

  function showUnit() {
    return `${unit ? ` ${unit}` : value > 1 ? " Tage" : " Tag"}`;
  }

  return (
    <div className={`stepper ${props.className}`} {...props}>
      <button
        aria-label={`increase ${showUnit()}`}
        className="stepper__control"
        onClick={decrease}
      >
        <RiSubtractFill />
      </button>
      <span className="stepper__value">
        {value}
        {showUnit()}
      </span>
      <button
        aria-label={`decrease ${showUnit()}`}
        className="stepper__control"
        onClick={increase}
      >
        <RiAddFill />
      </button>
    </div>
  );
};

Stepper.propTypes = {
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  unit: PropTypes.string,
};

Stepper.defaultProps = {
  onChange: undefined,
  min: 1,
  max: 3,
  unit: "",
};
