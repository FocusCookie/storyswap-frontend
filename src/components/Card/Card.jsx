import React from "react";
import PropTypes from "prop-types";
import "./Card.css";

export const Card = ({ className, children, paddingoff, props }) => {
  return (
    <div
      className={`card ${paddingoff ? "" : "card--padding"} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  paddingoff: PropTypes.bool,
};

Card.defaultProps = {
  className: "",
  paddingoff: false,
};
