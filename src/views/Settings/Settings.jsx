import React from "react";
import "./Settings.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../../components/Button/Button";

export const Settings = ({ ...props }) => {
  const { logout, user } = useAuth0();

  function handleLogout() {
    logout({ returnTo: window.location.origin });
  }
  return (
    <div className="settings-view ">
      <img src={user.picture} alt={user.name} />
      <h2>Name: {user.name}</h2>
      <h2>nickname: {user.nickname}</h2>
      <p>email: {user.email}</p>

      <Button size="lg" onClick={handleLogout}>
        ausloggen
      </Button>
    </div>
  );
};
