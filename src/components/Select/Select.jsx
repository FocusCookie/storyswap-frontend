import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Select.css";
import { Button } from "../Button/Button";

export const Select = ({ items, variant, onChange, preselected, ...props }) => {
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
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      icon: PropTypes.any,
      reverse: PropTypes.bool,
    })
  ),
  variant: PropTypes.oneOf(["accent", "primary"]),
  preselected: PropTypes.string,
  onChange: PropTypes.func,
};

Select.defaultProps = {
  items: [],
  variant: "accent",
  preselected: "",
  onChange: undefined,
};
