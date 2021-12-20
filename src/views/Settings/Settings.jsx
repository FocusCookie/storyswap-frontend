import React from "react";
import "./Settings.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../../components/Button/Button";

export const Settings = ({ ...props }) => {
  const { logout, user } = useAuth0();
  return (
    <div className="settings-view ">
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>

      <Button
        size="lg"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        ausloggen
      </Button>
    </div>
  );
};
