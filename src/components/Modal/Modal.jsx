import React from "react";
import PropTypes from "prop-types";
import "./Modal.css";
import { Card } from "../Card/Card";

export const Modal = ({ paddingoff, ...props }) => {
  return (
    <div
      className={`modal ${props.className ? props.className : ""}`}
      {...props}
    >
      <Card paddingoff={paddingoff} className="modal__card">
        {props.children}
      </Card>
    </div>
  );
};

Modal.propTypes = {
  /**
   * removes the padding form the card in the modal
   */
  paddingoff: PropTypes.bool,
};

Modal.defaultProps = {
  paddingoff: false,
};
