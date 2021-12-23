import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Select.css";
import { Button } from "../Button/Button";

export const Select = ({
  items,
  variant,
  onChange,
  preselected,
  disabled,
  ...props
}) => {
  const itemsAreFilled = items.length > 0;
  const initialySelected = itemsAreFilled && preselected ? preselected : "";
  const [selected, setSelected] = useState(initialySelected);

  function selectItem(item) {
    setSelected(item.label);
    if (item.label !== selected) {
      onChange(item.label);
    }
  }

  return (
    <div className="select" {...props}>
      {items.length === 0 && <span>No Items given</span>}
      <>
        {items.map((item, index) => (
          <Button
            disabled={disabled}
            size="full"
            key={`${item.label}-${index}`}
            variant={`${item.label}` === selected ? variant : "secondary"}
            icon={item.icon ? item.icon : null}
            reverse={item.reverse}
            onClick={() => selectItem(item)}
            style={{ transition: "background-color 300ms ease-in" }}
          >
            {item.label}
          </Button>
        ))}
      </>
    </div>
  );
};

Select.propTypes = {
  /**
   * items to disbplay in the select
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      icon: PropTypes.any,
      reverse: PropTypes.bool,
    })
  ),
  /**
   * color appereance of the buttons
   */
  variant: PropTypes.oneOf(["accent", "primary"]),
  /**
   * which item is initially selected
   */
  preselected: PropTypes.string,
  /**
   * onChange handler
   */
  onChange: PropTypes.func,
  /**
   * disabled input
   */
  disabled: PropTypes.bool,
};

Select.defaultProps = {
  disabled: false,
  items: [],
  variant: "accent",
  preselected: "",
  onChange: undefined,
};
