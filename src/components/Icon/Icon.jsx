import React from "react";
import PropTypes from "prop-types";
import "./Icon.css";

<<<<<<< HEAD
export const Icon = ({ children, className, size, ...props }) => {
=======
export const Icon = ({ children, size, className, ...props }) => {
>>>>>>> d2fe5a021750089b286ce721b496e25241c8de7c
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
