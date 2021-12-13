import React from "react";
import PropTypes from "prop-types";
import "./Icon.css";

export const Icon = ({ children, className, size, ...props }) => {
  return (
    <div
      className={`icon icon--${size} ${className}`}
      style={{ fontSize: size }}
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
  size: PropTypes.oneOf(["xs", "sm", "base", "lg", "xl"]),
  /**
   * add classes to the icon element
   */
  className: PropTypes.string,
};

Icon.defaultProps = {
  size: "base",
  className: "",
};
