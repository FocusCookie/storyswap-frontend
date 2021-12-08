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
  className,
  ...props
}) => {
  return (
    <div
      className={[
        `${className ? className : ""}`,
        "label",
        variant ? `label--variant-${variant}` : "",
        size ? `label--size-${size}` : "",
        uppercase ? `label--uppercase` : "",
        align ? `label--align-${align}` : "",
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
  size: "medium",
  uppercase: true,
  align: "left",
};
