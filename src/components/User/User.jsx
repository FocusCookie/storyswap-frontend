import React from "react";
import PropTypes from "prop-types";
import "./User.css";

export const User = ({ user, ...props }) => {
  return (
    <div className="user" {...props}>
      <img src={user.picture} alt={user.nickname} className="user__picture" />
      <span className="user__nickname">{user.nickname}</span>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    sub: PropTypes.string,
    nickname: PropTypes.string,
    picture: PropTypes.string,
  }),
};

User.defaultProps = {
  user: { sub: "", nickname: "", picture: "" },
};
