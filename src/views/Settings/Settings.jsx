import React, { useState } from "react";
import "./Settings.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useApiToken } from "../../contexts/apiToken.context";
import { useMutation } from "react-query";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { Modal } from "../../components/Modal/Modal";
import sadPerson from "../../assets/person/sad.png";

//TODO: Implement delete account post
//TODO: delete change password mail
//TODO: implement change bentuzername and avataer

export const Settings = ({ ...props }) => {
  const { logout, user } = useAuth0();
  const { apiTokenState } = useApiToken();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  function handleLogout() {
    logout({ returnTo: window.location.origin });
  }

  function toggleDeleteModal() {
    setShowDeleteModal((lastState) => !lastState);
  }

  function handleDeleteAccount() {
    console.log("delete");
    setIsDeleting(true);
  }

  return (
    <div className="settings-view">
      <h1 className="headline text-center">Einstellungen</h1>

      <img
        src={user.picture}
        alt={user.name}
        className="settings-view__user__image"
      />

      <Input label="Name" type="text" value={user.name} disabled />
      <Input label="Benutzername" type="text" value={user.nickname} disabled />
      <Input label="e-mail" type="mail" value={user.email} disabled />

      <Button size="lg" onClick={handleLogout}>
        ausloggen
      </Button>

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
