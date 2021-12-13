import React from "react";
import PropTypes from "prop-types";
import "./Navigation.css";
import { NavSlot } from "../NavSlot/NavSlot";

export const Navigation = ({ onSelect, select, ...props }) => {
  return (
    <div className="navigation" {...props}>
      <NavSlot
        onClick={onSelect}
        selected={select === "home" ? true : false}
        variant="home"
      />
      <NavSlot
        onClick={onSelect}
        selected={select === "library" ? true : false}
        variant="library"
      />
      <NavSlot
        onClick={onSelect}
        selected={select === "messages" ? true : false}
        variant="messages"
      />
      <NavSlot
        onClick={onSelect}
        selected={select === "settings" ? true : false}
        variant="settings"
      />
    </div>
  );
};

Navigation.propTypes = {
  /**
   * which item should be selected
   */
  select: PropTypes.oneOf(["home", "library", "messages", "settings"]),
  /**
   * onSelect click handler
   */
  onSelect: PropTypes.func,
};

Navigation.defaultProps = {
  select: "home",
  onSelect: undefined,
};
