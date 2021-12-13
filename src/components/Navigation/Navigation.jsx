import React from "react";
import PropTypes from "prop-types";
import "./Navigation.css";
import { NavSlot } from "../NavSlot/NavSlot";

export const Navigation = ({ onSelect, selected, ...props }) => {
  return (
    <div className="navigation" {...props}>
      <NavSlot
        onClick={onSelect}
        selected={selected === "home" ? true : false}
        variant="home"
      />
      <NavSlot
        onClick={onSelect}
        selected={selected === "library" ? true : false}
        variant="library"
      />
      <NavSlot
        onClick={onSelect}
        selected={selected === "messages" ? true : false}
        variant="messages"
      />
      <NavSlot
        onClick={onSelect}
        selected={selected === "settings" ? true : false}
        variant="settings"
      />
    </div>
  );
};

Navigation.propTypes = {
  /**
   * which item should be selected
   */
  selected: PropTypes.oneOf(["home", "library", "messages", "settings"]),
  /**
   * onSelect click handler
   */
  onSelect: PropTypes.func,
};

Navigation.defaultProps = {
  selected: "home",
  onSelect: undefined,
};
