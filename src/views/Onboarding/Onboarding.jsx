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

export const Onboarding = ({ ...props }) => {
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
  const selectItems = [{ label: "Ja" }, { label: "Nein" }];
  const [onboardingFinished, setOnboardingFinished] = useState(false);

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
    if (value === "Ja") {
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
    });

    setPostMetadata(true);
    setPostNickname(true);

    console.log("save");
  }

  function handleCancel() {
    logout({ returnTo: window.location.origin });
  }

  function handleFinished() {
    metadataDispatch({ type: "setMetadata", payload: postMetadataResponse });
    navigate("/home");
  }

  return (
    <div className="onboarding-view">
      {!onboardingFinished && (
        <>
          <section className="onboarding-view__section">
            <h1 className="headline">Dein Name</h1>
            <p>
              Unter welchen Namen sollen dich die Anderen Nutzer sehen 👀
              können?
            </p>
            <Input
              label="Anzeigename"
              placeholder="Anzeigename"
              value={nickname}
              onChange={handleNicknameChange}
              error={nicknameError}
              type="text"
              disabled={postMetadata || postNickname}
            />
          </section>

          <section className="onboarding-view__section">
            <h1 className="headline">Dein Einzugsgebiet</h1>
            <p>
              In welchen Gebiet 🗺 sollen wir für dich nach Büchern suchen 🔎?
            </p>
            <Input
              disabled={postMetadata || postNickname}
              label="Stadt"
              placeholder="Stadt"
              value={city}
              onChange={handleCityChange}
              error={cityError}
              type="text"
            />

            <Input
              disabled={postMetadata || postNickname}
              label="Postleitzahl"
              placeholder="Postleitzahl"
              value={zip}
              onChange={handleZipChange}
              error={zipError}
              type="text"
            />
          </section>

          <section className="onboarding-view__section">
            <h1 className="headline">Bücher verleihen</h1>
            <p>
              Wäre es für dich in Zukunft eine Option einige deiner
              Lieblingsstücke ♥ zu verleihen?
            </p>
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
              Speichern & Loslegen
            </Button>
            <Button
              disabled={postMetadata || postNickname}
              variant="secondary"
              onClick={handleCancel}
            >
              Abbrechen & Ausloggen
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
          <h1 className="headline">Super {nickname}!</h1>
          <p>
            Alles ist eingerichtet 🎉! Schnapp dir eine Tasse Kaffee ☕, Tee
            oder dein Lieblingsgetränk deiner Wahl und begebe dich auf die Suche
            🔎 nach deinem nächsten Lieblingsbuch 📖.
          </p>
          <Button size="xl" onClick={handleFinished}>
            Loslegen
          </Button>
        </section>
      )}
    </div>
  );
};
