import React from "react";
import PropTypes from "prop-types";
import "./Icon.css";

export const Icon = ({ children, size, ...props }) => {
  return (
    <div className={`icon icon--${size}`} style={{ fontSize: size }} {...props}>
      {children}
    </div>
  );
};

Icon.propTypes = {
  /**
   * Size of the icon
   */
  size: PropTypes.oneOf(["xs", "sm", "base", "lg", "xl"]),
};

Icon.defaultProps = {
  size: "base",
};
