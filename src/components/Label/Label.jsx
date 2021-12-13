import React from "react";
import PropTypes from "prop-types";
import "./Label.css";

export const Label = ({
  children,
  htmlFor,
  variant,
  size,
  uppercase,
  className,
  ...props
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={[
        "label",
        variant ? `label--variant-${variant}` : "",
        size ? `label--size-${size}` : "",
        uppercase ? `label--uppercase` : "",
        `${className ? className : ""}`,
      ].join(" ")}
      {...props}
    >
      {children ? children : "label"}
    </label>
  );
};

Label.propTypes = {
  /**
   * the style of the label
   */
  variant: PropTypes.oneOf(["base", "highlight"]),
  /**
   * the style of the label
   */
  size: PropTypes.oneOf(["xs", "sm", "base", "lg", "xl"]),
  /**
   * transforms the text to uppercase
   */
  uppercase: PropTypes.bool,
  /**
   * add classes to the Label
   */
  className: PropTypes.string,
  /**
   * For which html elemt is the label (id of the element)
   */
  htmlFor: PropTypes.string,
};

Label.defaultProps = {
  variant: "highlight",
  size: "base",
  uppercase: true,
  className: "",
  htmlFor: "",
};
