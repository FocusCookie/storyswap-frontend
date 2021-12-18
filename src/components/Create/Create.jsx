import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Create.css";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { Input } from "../Input/Input";
import { RiAddCircleFill, RiErrorWarningLine } from "react-icons/ri";

export const Create = ({ onCreate, error, ...props }) => {
  const [creationModal, setCreationModal] = useState(false);
  const [isbnValue, setIsbnValue] = useState("");
  const [isbnError, setIsbnError] = useState("");
  const [isCreating, setisCreating] = useState(false);

  useEffect(() => {
    setisCreating(false);
  }, [error]);

  function toggleCreationModal() {
    setCreationModal((lastState) => !lastState);
  }

  function handleIsbnChange(isbn) {
    setIsbnValue(isbn);
  }

  function createHandler() {
    setIsbnError("");

    if (isbnValue.length < 9 || isbnValue.length > 13) {
      setIsbnError("ISBN muss 9-13 stellig sein");
    } else {
      setisCreating(true);
      onCreate(isbnValue);
    }
  }
  return (
    <div className="create" {...props}>
      {creationModal && (
        <Modal>
          <div className="create__modal">
            <span className="create__modal__title">Buch inserieren</span>

            {error !== "" ? (
              <div className="create__error">
                <RiErrorWarningLine className="create__error__icon" />
                <p>{error}</p>
              </div>
            ) : null}

            <Input
              label="ISBN / ISBN13"
              placeholder="ISBN oder ISBN13"
              onChange={handleIsbnChange}
              value={isbnValue}
              error={isbnError}
            />
            <Button loading={isCreating} onClick={createHandler}>
              buch einstellen
            </Button>
            <Button
              disabled={isCreating}
              variant="secondary"
              onClick={toggleCreationModal}
            >
              schliessen
            </Button>
          </div>
        </Modal>
      )}
      <Button reverse onClick={toggleCreationModal} icon={<RiAddCircleFill />}>
        Buch inserieren
      </Button>
    </div>
  );
};

Create.propTypes = {
  /**
   * click handler to create offer
   */
  onCreate: PropTypes.func,
  /**
   * creation is done
   */
  created: PropTypes.bool,
  /**
   * error message to display
   */
  error: PropTypes.string,
};

Create.defaultProps = {
  onCreate: undefined,
  created: false,
  error: "",
};
