import React from "react";
import "./Messages.css";
import { useParams } from "react-router-dom";

export const Messages = ({ ...props }) => {
  const { contact } = useParams();

  return (
    <div className="messages-view">
      {contact ? <span>contact {contact} </span> : <span>show chats</span>}
    </div>
  );
};
