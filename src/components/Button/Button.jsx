import React from "react";
import PropTypes from "prop-types";
import "./Button.css";
import { Icon } from "../Icon/Icon";
import { Label } from "../Label/Label";

export const Button = ({
  children,
  size,
  icon,
  reverse,
  variant,
  disabled,
  onClick,
  ...props
}) => {
  function handleClick() {
    if (!disabled) onClick();
  }

  return (
    <button
      className={`button ${variant ? `button--variant-${variant}` : ""} ${
        size ? `button--${size}` : ""
      }`}
      disabled={disabled}
      onClick={() => handleClick()}
      {...props}
    >
      {icon && !reverse ? <Icon size={size}>{icon}</Icon> : null}
      <Label size={size} variant="highlight" align="center">
        {children}
      </Label>
      {icon && reverse ? <Icon size={size}>{icon}</Icon> : null}
    </button>
  );
};

Button.propTypes = {
  /**
   * Size of the button
   */
  size: PropTypes.oneOf(["xs", "sm", "base", "lg", "xl"]),
  /**
   * An element that will be placed into the Icon component
   */
  icon: PropTypes.any,
  /**
   * Change the order from left-to-right to right-to-left
   */
  reverse: PropTypes.bool,
  /**
   * The look of the button
   */
  variant: PropTypes.oneOf(["primary", "secondary", "white", "text"]),
  /**
   * disabled the button
   */
  disabled: PropTypes.bool,
  /**
   * click handler
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  size: "base",
  icon: null,
  reverse: false,
  variant: "primary",
  onClick: undefined,
};
