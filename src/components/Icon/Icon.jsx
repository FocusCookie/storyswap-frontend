import React from "react";
import PropTypes from "prop-types";
import "./Icon.css";

export const Icon = ({ children, variant, size, className, ...props }) => {
  return (
    <div
      className={`icon icon--${size} icon--${variant} ${className}`}
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
  /**
   * change the variant of the icon works with font based icons
   */
  variant: PropTypes.oneOf(["primary", "accent", "white", "medium"]),
};

Icon.defaultProps = {
  size: "base",
  variant: "medium",
};
