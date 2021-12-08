import React from "react";
import PropTypes from "prop-types";
import "./Label.css";

export const Label = ({
  value,
  variant,
  color,
  size,
  uppercase,
  align,
  ...props
}) => {
  return (
    <div
      className={[
        "label",
        color ? `text-${color}` : "",
        variant ? `font-${variant}` : "",
        size ? `text-${size}` : "",
        uppercase ? `uppercase` : "",
        align ? `text-${align}` : "",
      ].join(" ")}
      {...props}
    >
      {value}
    </div>
  );
};

Label.propTypes = {
  /**
   * The value which will be displayed in the label
   */
  value: PropTypes.string,
  /**
   * the style of the label
   */
  variant: PropTypes.oneOf(["base", "highlight"]),
  /**
   * the color will be applied as text-color. The color needs to be a valid tailwind color class
   */
  color: PropTypes.string,
  /**
   * the style of the label
   */
  size: PropTypes.oneOf(["xs", "sm", "base", "lg", "xl"]),
  /**
   * transforms the text to uppercase
   */
  uppercase: PropTypes.bool,
  /**
   * aligns the label value horizontally
   */
  align: PropTypes.oneOf(["left", "center", "right"]),
};

Label.defaultProps = {
  value: "label",
  variant: "highlight",
  color: "medium-900",
  size: "medium",
  uppercase: true,
  align: "left",
};
