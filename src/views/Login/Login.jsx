import React, { useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../../components/Button/Button";
import person from "../../assets/person/happy.png";

export const Login = ({ ...props }) => {
  const {
    loginWithRedirect,
    isAuthenticated,
    getAccessTokenSilently,
    isLoading,
  } = useAuth0();
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

        {isLoading && (
          <div>
            <h1 className="headline">
              <span className="animate-spin">⏳</span> Logge ein
            </h1>
            <p>
              Wir haben einen früheren Login erkannt und loggen dich erneut ein.
            </p>
          </div>
        )}

        {!isLoading && !isAuthenticated && (
          <div>
            <div className="login-view__title">
              <div className="animation-wink">👋</div>
              <h1 className="headline">Willkommen!</h1>
            </div>
            <p>
              Nur noch ein Login trennt dich und deine zukünftigen
              Lieblingsbücher.
            </p>
          </div>
        )}
      </div>
      {!isLoading && !isAuthenticated && (
        <Button size="xl" onClick={handleLogin}>
          Anmelden / Registrieren
        </Button>
      )}
    </div>
  );
};
