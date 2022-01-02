import React from "react";
import PropTypes from "prop-types";
import "./Message.css";
import { Card } from "../Card/Card";

export const Message = ({ message, timestamp, creator, ...props }) => {
  return (
    <div
      className={`message ${
        creator ? "message--justify-end" : "message--justify-start"
      }`}
    >
      <Card
        className={`message__card ${creator ? "message--primary" : ""}`}
        {...props}
      >
        <p className="message__content">{message}</p>
        <p className="message__timestamp">{timestamp}</p>
      </Card>
    </div>
  );
};

Message.propTypes = {
  /**
   * the actual message
   */
  message: PropTypes.string,
  /**
   * timestamp of the message
   */
  timestamp: PropTypes.string,
  /**
   * the user is the creator of the message
   */
  creator: PropTypes.bool,
};

Message.defaultProps = {
  message: "",
  created: "",
  creator: false,
};
