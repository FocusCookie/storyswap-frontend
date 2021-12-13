import React from "react";
import PropTypes from "prop-types";
import { Icon } from "../Icon/Icon";
import { ReactComponent as Flag } from "../../assets/Flag.svg";
import {
  RiHome7Line,
  RiBookMarkLine,
  RiMailLine,
  RiSettings4Line,
} from "react-icons/ri";
import "./NavSlot.css";

export const NavSlot = ({ onClick, variant, selected, ...props }) => {
  function getVariantIcon(variant) {
    switch (variant) {
      case "home":
        return <RiHome7Line />;

      case "library":
        return <RiBookMarkLine />;

      case "messages":
        return <RiMailLine />;

      case "settings":
        return <RiSettings4Line />;

      default:
        return <RiHome7Line />;
    }
  }

  function clickHandler() {
    if (!selected) onClick(variant);
  }

  return (
    <div
      className={`navSlot ${props.className ? props.className : ""}`}
      {...props}
      onClick={clickHandler}
    >
      <Flag
        className={`navSlot__flag ${
          selected ? "navSlot__flag--selected" : "navSlot__flag--not-selected"
        }`}
      />
      <Icon
        className={`navSlot__icon ${selected ? "navSlot__icon--selected" : ""}`}
      >
        {getVariantIcon(variant)}
      </Icon>
    </div>
  );
};

NavSlot.propTypes = {
  /**
   * the nav slot is selected and active
   */
  selected: PropTypes.bool,
  /**
   * variants of the navslot
   */
  variant: PropTypes.oneOf(["home", "library", "messages", "settings"]),
  /**
   * onClick click handler
   */
  onClick: PropTypes.func,
};

NavSlot.defaultsProps = {
  variant: "home",
  selected: false,
  onClick: PropTypes.undefined,
};
