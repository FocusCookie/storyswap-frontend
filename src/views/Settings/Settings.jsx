import React, { useState, useEffect } from "react";
import "./Settings.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useApiToken } from "../../contexts/apiToken.context";
import { useMutation } from "react-query";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { Modal } from "../../components/Modal/Modal";
import sadPerson from "../../assets/person/sad.png";
import { user as userApi } from "../../services/api.servise";
import { isValidEmail, deletePageCookies } from "../../utils/utils";

export const Settings = ({ ...props }) => {
  const { logout, user } = useAuth0();
  const { apiTokenState } = useApiToken();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [passwordMailIsSent, setPasswordMailIsSent] = useState(false);
  const [isSendingPasswordMail, setIsSendingPasswordMail] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [update, setUpdate] = useState({
    name: user.name,
    nickname: user.nickname,
    email: user.email,
    picture: user.picture,
  });
  const [name, setName] = useState(user.name);
  const [nickname, setNickname] = useState(user.nickname);
  const [email, setEmail] = useState(user.email);
  const [emailError, setEmailError] = useState("");
  const [picture, setPicture] = useState(user.picture);

  const sendPasswordMailRequest = useMutation(() => {
    return userApi.sendPasswordChangeMail(apiTokenState.value);
  });

  const updateUserRequest = useMutation((user) => {
    return userApi.setUser(apiTokenState.value, user);
  });

  const deleteUserRequest = useMutation(
    () => {
      return userApi.deleteAccount(apiTokenState.value);
    },
    { enabled: isDeleting }
  );

  useEffect(() => {
    if (
      !sendPasswordMailRequest.isLoading &&
      !sendPasswordMailRequest.isFetching &&
      sendPasswordMailRequest.isSuccess
    ) {
      setIsSendingPasswordMail(false);
      setPasswordMailIsSent(true);
    }
  }, [sendPasswordMailRequest.isLoading]);

  useEffect(() => {
    if (
      !deleteUserRequest.isLoading &&
      !deleteUserRequest.isFetching &&
      deleteUserRequest.isSuccess
    ) {
      deletePageCookies();
      localStorage.clear();
      sessionStorage.clear();
      logout();
    }
  }, [sendPasswordMailRequest.isLoading, deleteUserRequest.isSuccess]);

  useEffect(() => {
    setUpdate({ name, nickname, email, picture });
  }, [name, nickname, email, picture]);

  function handleLogout() {
    logout({ returnTo: window.location.origin });
  }

  function toggleDeleteModal() {
    setShowDeleteModal((lastState) => !lastState);
  }

  function handleDeleteAccount() {
    setIsDeleting(true);
    deleteUserRequest.mutate();
  }

  function handlePassword() {
    sendPasswordMailRequest.mutate();
    setIsSendingPasswordMail(true);
  }

  function handleEditUser() {
    setEditUser(true);
  }

  function handleSaveUserEdit() {
    updateUserRequest.mutate(update);
    setEditUser(false);
  }

  function handleEditCancel() {
    setNickname(user.nickname);
    setEmail(user.email);
    setName(user.name);
    setPicture(user.picture);
    setEditUser(false);
  }

  function handleNameChange(value) {
    setName(value);
  }

  function handlePictureChange(value) {
    setPicture(value);
  }

  function handleNicknameChange(value) {
    setNickname(value);
  }

  function handleEmailChange(value) {
    setEmailError(isValidEmail(value) ? "" : "Ungültige eMail.");
    setEmail(value);
  }

  return (
    <div className="settings-view">
      <h1 className="headline text-center">Einstellungen</h1>

      <img
        src={user.picture}
        alt={user.name}
        className="settings-view__user__image"
      />

      <Button size="lg" onClick={handleLogout}>
        ausloggen
      </Button>

      <Input
        label="Name"
        type="text"
        value={name}
        disabled={!editUser}
        onChange={handleNameChange}
      />
      <Input
        label="Benutzername"
        type="text"
        value={nickname}
        disabled={!editUser}
        onChange={handleNicknameChange}
      />
      <Input
        label="e-mail"
        type="mail"
        value={email}
        disabled={!editUser}
        onChange={handleEmailChange}
        error={emailError}
      />
      <Input
        label="Profilbild Link"
        type="text"
        value={picture}
        disabled={!editUser}
        onChange={handlePictureChange}
      />

      {editUser && (
        <>
          <p className="text-xs text-medium-900 text-center">
            Profilbilder werden erst nach einer erneuten Anmeldung angezeigt.
          </p>
          <Button
            size="lg"
            variant="primary"
            onClick={handleSaveUserEdit}
            loading={
              updateUserRequest.isLoading || updateUserRequest.isFetching
            }
          >
            speichern
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={handleEditCancel}
            disabled={
              updateUserRequest.isLoading || updateUserRequest.isFetching
            }
          >
            abbruch
          </Button>
        </>
      )}

      {!editUser && (
        <Button size="lg" variant="secondary" onClick={handleEditUser}>
          Profil editieren
        </Button>
      )}

      <Button
        size="lg"
        variant="secondary"
        onClick={handlePassword}
        loading={isSendingPasswordMail}
      >
        password ändern
      </Button>

      {passwordMailIsSent && !isSendingPasswordMail && (
        <p className="text-center">
          Du hast eine e-Mail erhalten, mit der du dein Passwort ändern kannst.
        </p>
      )}

      <Button size="xs" variant="text" onClick={toggleDeleteModal}>
        Account löschen
      </Button>

      {showDeleteModal && (
        <Modal>
          <div className="settings-view__delte-modal ">
            <img src={sadPerson} alt="Sad Person" />
            <h1 className="headline">Nuterkonto löschen</h1>
            <p>
              Oh nein 😳, schade das du uns verlassen möchtest. Bist du dir
              sicher das du dein Nuterkonto löschen möchtest?
            </p>

            <div className="py-4">
              <Button
                loading={isDeleting}
                size="sm"
                variant="text"
                onClick={handleDeleteAccount}
              >
                Ja Nutzerkonto löschen
              </Button>
            </div>

            <Button disabled={isDeleting} size="xl" onClick={toggleDeleteModal}>
              abbrechen
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
