import React, { useState, useEffect } from "react";
import "./Onboarding.css";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components/Input/Input";
import { Select } from "../../components/Select/Select";
import { Button } from "../../components/Button/Button";
import { isValidZip } from "../../utils/utils";
import { useQuery } from "react-query";
import { user as userApi } from "../../services/api.servise";
import { useApiToken } from "../../contexts/apiToken.context";
import { useAuth0 } from "@auth0/auth0-react";
import person from "../../assets/person/smilling.png";
import { useMetadata } from "../../contexts/metadata.context";
import { useLanguage } from "../../contexts/language.context";

export const Onboarding = ({ ...props }) => {
  const { languageState, languageDispatch } = useLanguage();
  const navigate = useNavigate();
  const { logout } = useAuth0();
  const { apiTokenState } = useApiToken();
  const [nickname, setNickname] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [zip, setZip] = useState("");
  const [zipError, setZipError] = useState("");
  const [userWouldRentBooks, setUserWouldRentBooks] = useState(false);
  const selectItems = [
    { label: languageState.texts.words.yes },
    { label: languageState.texts.words.no },
  ];
  const [onboardingFinished, setOnboardingFinished] = useState(false);
  const languageItems = [
    { label: "DE", icon: "🇩🇪" },
    { label: "EN", icon: "🇬🇧" },
  ];

  const [postMetadataData, setPostMetadataData] = useState(null);
  const [postMetadata, setPostMetadata] = useState(false);

  const [postNickname, setPostNickname] = useState(false);

  const { metadataDispatch } = useMetadata();

  const { isLoading: postMetadataIsLoading, data: postMetadataResponse } =
    useQuery(
      "metadata",
      async () => {
        return await userApi.setMetadata(
          apiTokenState?.value,
          postMetadataData
        );
      },
      {
        enabled: postMetadata,
      }
    );

  const { isLoading: postNicknameIsLoading, data: postNicknameResponse } =
    useQuery(
      "nickname",
      async () => {
        return await userApi.setUser(apiTokenState?.value, {
          nickname: nickname,
        });
      },
      {
        enabled: postNickname,
      }
    );

  useEffect(() => {
    if (
      !postMetadataIsLoading &&
      postMetadataResponse &&
      !postNicknameIsLoading &&
      postNicknameResponse
    ) {
      setPostMetadata(false);
      setPostNickname(false);
      setOnboardingFinished(true);
    }
  }, [
    postMetadataIsLoading,
    postMetadataResponse,
    postNicknameIsLoading,
    postNicknameResponse,
  ]);

  function resetErrors() {
    setNicknameError("");
    setCityError("");
    setZipError("");
  }

  function isValidNickname(nickname) {
    if (!nickname || nickname.length < 3 || nickname > 30) return false;

    return true;
  }
  function isValidCity(city) {
    if (!city || nickname.length < 2) return false;

    return true;
  }

  function handleNicknameChange(value) {
    setNickname(value);
  }

  function handleCityChange(value) {
    setCity(value);
  }

  function handleZipChange(value) {
    setZip(value);
  }

  function handleRentelSelect(value) {
    if (value.toLowerCase() === "ja" || value.toLowerCase() === "yes") {
      setUserWouldRentBooks(true);
    } else {
      setUserWouldRentBooks(false);
    }
  }

  function handleSaveMetadata() {
    resetErrors();

    if (!isValidZip(zip) || !isValidNickname(nickname) || !isValidCity) {
      if (!isValidZip(zip)) setZipError("Keine zulässige Postleitzahl.");

      if (!isValidNickname(nickname))
        setNicknameError(
          "Der Anzeigename muss zwischen 6 und 30 Zeichen lang sein."
        );

      if (!isValidCity(city))
        setCityError("Die Stadt muss mindestens drei Zeichen lang sein.");

      return;
    }

    setPostMetadataData({
      city,
      zip,
      rental: userWouldRentBooks,
      isOnboarded: true,
      language: languageState.active,
    });

    setPostMetadata(true);
    setPostNickname(true);
  }

  function handleCancel() {
    logout({ returnTo: window.location.origin });
  }

  function handleFinished() {
    metadataDispatch({ type: "setMetadata", payload: postMetadataResponse });
    navigate("/home");
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
    <div className="onboarding-view">
      {!onboardingFinished && (
        <>
          <section className="onboarding-view__section">
            <h1 className="headline">{languageState.texts.words.language}</h1>
            <p>{languageState.texts.onboarding.choose_language}</p>
            <Select
              preselected={
                languageState.active === "de-DE"
                  ? languageItems[0].label
                  : languageItems[1].label
              }
              items={languageItems}
              onChange={handleLanguageChange}
            />
          </section>

          <section className="onboarding-view__section">
            <h1 className="headline">
              {languageState.texts.onboarding.your_name}
            </h1>
            <p>{languageState.texts.onboarding.your_name_desc}</p>
            <Input
              label={languageState.texts.words.nickname}
              placeholder={languageState.texts.words.nickname}
              value={nickname}
              onChange={handleNicknameChange}
              error={nicknameError}
              type="text"
              disabled={postMetadata || postNickname}
            />
          </section>

          <section className="onboarding-view__section">
            <h1 className="headline">
              {languageState.texts.onboarding.your_searcharea}
            </h1>
            <p>{languageState.texts.onboarding.your_searcharea_desc}</p>
            <Input
              disabled={postMetadata || postNickname}
              label={languageState.texts.words.city}
              placeholder={languageState.texts.words.city}
              value={city}
              onChange={handleCityChange}
              error={cityError}
              type="text"
            />

            <Input
              disabled={postMetadata || postNickname}
              label={languageState.texts.words.zip}
              placeholder={languageState.texts.words.zip}
              value={zip}
              onChange={handleZipChange}
              error={zipError}
              type="text"
            />
          </section>

          <section className="onboarding-view__section">
            <h1 className="headline">
              {languageState.texts.onboarding.rent_books}
            </h1>
            <p>{languageState.texts.onboarding.rent_books_desc}</p>
            <Select
              disabled={postMetadata || postNickname}
              items={selectItems}
              preselected={selectItems[1].label}
              variant="accent"
              onChange={handleRentelSelect}
            />
          </section>

          <section className="onboarding-view__section onboarding-view__section--gap-4 mt-4">
            <Button
              loading={postMetadata || postNickname}
              size="xl"
              onClick={handleSaveMetadata}
            >
              {languageState.texts.onboarding.save_and_go}
            </Button>
            <Button
              disabled={postMetadata || postNickname}
              variant="secondary"
              onClick={handleCancel}
            >
              {languageState.texts.onboarding.cancel_and_logout}
            </Button>
          </section>
        </>
      )}

      {onboardingFinished && (
        <section className="onboarding-view__section onboarding-view__section--gap-4">
          <img
            src={person}
            alt="Happy person with a cup"
            className="onboarding-view__person"
          />
          <h1 className="headline">
            {languageState.texts.words.nice} {nickname}!
          </h1>
          <p>{languageState.texts.onboarding.successfull_onboarded}</p>
          <Button size="xl" onClick={handleFinished}>
            {languageState.texts.words.go}
          </Button>
        </section>
      )}
    </div>
  );
};
