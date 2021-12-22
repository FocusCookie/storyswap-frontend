import React, { useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../../components/Button/Button";
import person from "../../assets/person/happy.png";

export const Login = ({ ...props }) => {
  const { loginWithRedirect, isAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then(() => navigate("/home"));
    }
  }, [isAuthenticated]);

  function handleLogin() {
    loginWithRedirect();
  }

  return (
    <div className="login-view">
      <div className="login-view__intro">
        <img
          src={person}
          alt="Happy person with a cup"
          className="login-view__person"
        />
        <h1 className="headline">👋 Willkommen!</h1>
        <p>
          Nur noch ein Login trennt dich und deine zukünftigen Lieblingsbücher.
        </p>
      </div>
      <Button size="xl" onClick={handleLogin}>
        Anmelden / Registrieren
      </Button>
    </div>
  );
};
