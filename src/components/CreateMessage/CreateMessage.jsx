import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./CreateMessage.css";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { RiMailSendLine } from "react-icons/ri";

export const CreateMessage = ({ onCreate, sending, ...props }) => {
  const [message, setMessage] = useState("");
  const [wasSend, setWasSend] = useState(false);

  useEffect(() => {
    if (sending && !wasSend) setWasSend(true);

    if (!sending && wasSend) {
      setMessage("");
      setWasSend(false);
    }
  }, [sending]);

  function handleMessageChange(value) {
    setMessage(value);
  }

  function handleCreate() {
    onCreate(message);
  }

  return (
    <div
      className={`create-message ${
        message !== "" ? "create-message--grid" : ""
      }`}
      {...props}
    >
      <Input
        type="textarea"
        className="create-message__input"
        onChange={handleMessageChange}
        value={message}
        disabled={sending}
      />

      {message !== "" && (
        <Button loading={sending} size="full" onClick={handleCreate}>
          <RiMailSendLine
            className={`create-message__icon ${
              sending ? "create-message__icon--sending" : ""
            }`}
          />
        </Button>
      )}
    </div>
  );
};

CreateMessage.propTypes = {
  /**
   * create handler with the message
   */
  onCreate: PropTypes.func,
  /**
   * message is sending, button and input are disabled
   */
  sending: PropTypes.bool,
};

CreateMessage.defualtProps = {
  onCreate: undefined,
  sending: false,
};
