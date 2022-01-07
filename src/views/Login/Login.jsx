import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "../../components/Button/Button";
import { Select } from "../../components/Select/Select";
import person from "../../assets/person/happy.png";
import { useLanguage } from "../../contexts/language.context";
import GERMAN_TEXTS from "../../translations/german";
import ENGLISH_TEXTS from "../../translations/english";

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
  const [texts, setTexts] = useState(ENGLISH_TEXTS);

  useEffect(() => {
    if (languageState === "de-DE") {
      setTexts(GERMAN_TEXTS);
    } else {
      setTexts(ENGLISH_TEXTS);
    }
  }, [languageState]);

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
      setTexts(GERMAN_TEXTS);
    } else {
      languageDispatch({ type: "setLanguage", payload: "en-US" });
      setTexts(ENGLISH_TEXTS);
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
              {texts.login.logging_in}
            </h1>
            <p>{texts.login.previous_login_message}</p>
          </div>
        )}

        {!isLoading && !isAuthenticated && (
          <div>
            <div className="login-view__title">
              <div className="animation-wink">👋</div>
              <h1 className="headline">{texts.login.title}</h1>
            </div>
            <p>{texts.login.message}</p>
          </div>
        )}
      </div>
      {!isLoading && !isAuthenticated && (
        <div className="login-view__actions">
          <Button size="xl" onClick={handleLogin}>
            {texts.login.button_label}
          </Button>

          <Select
            preselected={
              languageState === "de-DE"
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
