import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Stepper.css";
import { RiSubtractFill, RiAddFill } from "react-icons/ri";
import GERMAN_TEXTS from "../../translations/german";
import ENGLISH_TEXTS from "../../translations/english";

export const Stepper = ({
  unit,
  min,
  max,
  initValue,
  onChange,
  disabled,
  english,
  ...props
}) => {
  const [value, setValue] = useState(min || 1);
  const [texts, setTexts] = useState(GERMAN_TEXTS);

  useEffect(() => {
    onChange(value);
  }, [value]);

  useEffect(() => {
    if (english) {
      setTexts(ENGLISH_TEXTS);
    } else {
      setTexts(GERMAN_TEXTS);
    }
  }, [english]);

  function increase() {
    if (value < max) setValue((currentValue) => currentValue + 1);
  }
  function decrease() {
    if (value > min) setValue((currentValue) => currentValue - 1);
  }

  function showUnit() {
    return `${
      unit
        ? ` ${unit}`
        : value > 1
        ? ` ${texts.words.days}`
        : ` ${texts.words.day}`
    }`;
  }

  return (
    <div className={`stepper ${props.className}`} {...props}>
      <button
        aria-label={`increase ${showUnit()}`}
        className={`stepper__control ${
          disabled ? "stepper__control--disabled" : ""
        }`}
        onClick={decrease}
        disabled={disabled}
      >
        <RiSubtractFill />
      </button>
      <span className="stepper__value">
        {value}
        {showUnit()}
      </span>
      <button
        aria-label={`decrease ${showUnit()}`}
        className={`stepper__control ${
          disabled ? "stepper__control--disabled" : ""
        }`}
        onClick={increase}
        disabled={disabled}
      >
        <RiAddFill />
      </button>
    </div>
  );
};

Stepper.propTypes = {
  /**
   * handler when the value changes
   */
  onChange: PropTypes.func,
  /**
   * min value for the stepper
   */
  min: PropTypes.number,
  /**
   * max value for the stepper */
  max: PropTypes.number,
  /**
   *  custom unit */
  unit: PropTypes.string,
  /**
   *  disables the stepper */
  disabled: PropTypes.bool,
  /**
   * enable english texts
   */
  english: PropTypes.bool,
};

Stepper.defaultProps = {
  onChange: undefined,
  min: 1,
  max: 3,
  unit: "",
  disabled: false,
  english: false,
};
