import React from "react";
import PropTypes from "prop-types";
import "./Badge.css";

export const Badge = ({ variant, fullwidth, ...props }) => {
  return (
    <div
      className={`badge badge--${variant} ${
        fullwidth ? "badge--fullwidth" : ""
      }`}
      {...props}
    >
      {props.children}
    </div>
  );
};

Badge.propTypes = {
  /**
   * choose the appearence of the badge
   */
  variant: PropTypes.oneOf(["medium", "accent", "primary"]),
  /**
   * sets the badge to full with instead of max content
   */
  fullwidth: PropTypes.bool,
};

Badge.defaultProps = {
  variant: "medium",
  fullwidth: false,
};
