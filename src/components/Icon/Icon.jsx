import React from "react";
import PropTypes from "prop-types";
import "./Icon.css";

export const Icon = ({ className, children, size, ...props }) => {
  return (
    <div
      className={`icon icon--${size === "full" ? "base" : size} ${className}`}
      style={{ fontSize: size === "full" ? "base" : size }}
      {...props}
    >
      {children}
    </div>
  );
};

Icon.propTypes = {
  /**
   * Size of the icon
   */
  size: PropTypes.oneOf(["xs", "sm", "base", "lg", "xl", "full"]),
  /**
   * classes
   */
  className: PropTypes.string,
};

Icon.defaultProps = {
  size: "base",
  className: "",
};
