import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../../components/Button/Button";
import { Select } from "../../components/Select/Select";
import person from "../../assets/person/happy.png";
import { useLanguage } from "../../contexts/language.context";

export const Login = ({ ...props }) => {
  const {
    loginWithRedirect,
    isAuthenticated,
    getAccessTokenSilently,
    isLoading,
  } = useAuth0();
  const navigate = useNavigate();
  const { languageState, languageDispatch } = useLanguage();
  const languageItems = [
    { label: "DE", icon: "🇩🇪" },
    { label: "EN", icon: "🇬🇧" },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently().then(() => navigate("/home"));
    }
  }, [isAuthenticated]);

  function handleLogin() {
    loginWithRedirect();
  }

  function handleLanguageChange(language) {
    if (language === "DE") {
      languageDispatch({ type: "setLanguage", payload: "de-DE" });
      window.localStorage.setItem("language", "de-DE");
    } else {
      languageDispatch({ type: "setLanguage", payload: "en-US" });
      window.localStorage.setItem("language", "en-US");
    }
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
              <span className="animate-spin">⏳</span>
              {languageState.texts.login.logging_in}
            </h1>
            <p>{languageState.texts.login.previous_login_message}</p>
          </div>
        )}

        {!isLoading && !isAuthenticated && (
          <div>
            <div className="login-view__title">
              <div className="animation-wink">👋</div>
              <h1 className="headline">{languageState.texts.login.title}</h1>
            </div>
            <p>{languageState.texts.login.message}</p>
          </div>
        )}
      </div>
      {!isLoading && !isAuthenticated && (
        <div className="login-view__actions">
          <Button size="xl" onClick={handleLogin}>
            {languageState.texts.login.button_label}
          </Button>

          <Select
            preselected={
              languageState.active === "de-DE"
                ? languageItems[0].label
                : languageItems[1].label
            }
            items={languageItems}
            onChange={handleLanguageChange}
          />
        </div>
      )}
    </div>
  );
};
