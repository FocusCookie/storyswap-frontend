import React from "react";
import PropTypes from "prop-types";
import "./Card.css";

export const Card = ({ className, children, paddingoff, clean, ...props }) => {
  return (
    <div
      className={` ${clean ? "card--clean" : "card"} ${
        paddingoff ? "" : "card--padding"
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  /**
   * classes
   */
  className: PropTypes.string,
  /**
   * card without padding
   */
  paddingoff: PropTypes.bool,
  /**
   * turns of the shadow, background and border of the card
   */
  clean: PropTypes.bool,
};

Card.defaultProps = {
  className: "",
  paddingoff: false,
  clean: false,
};
