import React from "react";
import "./Chat.css";
import { useParams } from "react-router-dom";

export const Chat = ({ ...props }) => {
  const { contact } = useParams();

  return (
    <div className="chat-view">
      {contact ? <span>contact {contact} </span> : <span>show chats</span>}
    </div>
  );
};
