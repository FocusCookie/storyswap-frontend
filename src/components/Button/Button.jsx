import React from "react";
import PropTypes from "prop-types";
import "./Button.css";
import { Icon } from "../Icon/Icon";

export const Button = ({
  children,
  size,
  icon,
  reverse,
  variant,
  disabled,
  onClick,
  loading,
  ...props
}) => {
  function handleClick() {
    if (!disabled && !loading) onClick();
  }

  return (
    <button
      className={`button ${variant ? `button--variant-${variant}` : ""} ${
        size ? `button--${size}` : ""
      } ${loading ? "button--loading" : ""}`}
      disabled={disabled}
      onClick={() => handleClick()}
      {...props}
    >
      {icon && !reverse ? <Icon size={size}>{icon}</Icon> : null}
      <span className="button__text">{children}</span>
      {icon && reverse ? <Icon size={size}>{icon}</Icon> : null}
    </button>
  );
};

Button.propTypes = {
  /**
   * Size of the button
   */
  size: PropTypes.oneOf(["xs", "sm", "base", "lg", "xl", "full"]),
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
  variant: PropTypes.oneOf(["primary", "accent", "secondary", "white", "text"]),
  /**
   * disabled the button
   */
  disabled: PropTypes.bool,
  /**
   *  disables the onClick event and let the button pulse
   */
  loading: PropTypes.bool,
  /**
   * click handler
   */
  onClick: PropTypes.func,
};

Button.defaultProps = {
  size: "base",
  icon: null,
  reverse: false,
  loading: false,
  variant: "primary",
  onClick: undefined,
};
