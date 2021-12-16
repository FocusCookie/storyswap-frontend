import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./Offer.css";
import { Card } from "../Card/Card";
import { Modal } from "../Modal/Modal";
import { Stepper } from "../Stepper/Stepper";
import { Button } from "../Button/Button";
import { Map } from "../Map/Map";

export const Offer = ({ offer, ...props }) => {
  const [showOfferDetails, setShowOfferDetails] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);

  function formatDateString(date) {
    const GERMAN_MONTHS = [
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Dezember",
    ];

    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = GERMAN_MONTHS[newDate.getMonth()];
    const year = newDate.getFullYear();

    return `${day}. ${month} ${year}`;
  }

  function toggleOfferDetails() {
    setShowOfferDetails((lastState) => !lastState);
  }

  function toggleReservationModal() {
    setShowReservationModal((lastState) => !lastState);
  }

  return (
    <>
      {showReservationModal && (
        <Modal>
          <div className="offer__reservation-modal">
            <h1 className="offer__reservation__title">Reservierung</h1>
            <Stepper onChange={(v) => console.log(v)} />
            <Button onClick={() => console.log("reserve")}>reservieren</Button>
            <Button variant="secondary" onClick={toggleReservationModal}>
              zurück
            </Button>
          </div>
        </Modal>
      )}
      <Card
        className={`offer ${props.className ? props.className : ""}`}
        {...props}
      >
        <div className="offer__header">
          <div className="offer__title">{offer.book.title}</div>
          <div className="offer__author">
            VON {offer.book.authors.join(" & ")}
          </div>
        </div>

        {!showOfferDetails && (
          <div
            className="offer__cover"
            role="img"
            style={{ backgroundImage: `url(${offer.book.image})` }}
            onClick={toggleOfferDetails}
          ></div>
        )}

        {showOfferDetails && (
          <div className="offer__details">
            <div className="offer__map">
              <Map center={offer.coordinates} />
            </div>

            <Button size="xl" onClick={toggleReservationModal}>
              reservieren
            </Button>
            <Button variant="secondary" onClick={() => console.log("kontakt")}>
              anbieter kontaktieren
            </Button>
            <Button variant="secondary" onClick={toggleOfferDetails}>
              zurück
            </Button>
          </div>
        )}

        <div className="offer__divider"></div>
        <div className="offer__user">
          <div
            className="offer__user__picture"
            role="img"
            style={{ backgroundImage: `url(${offer.provider.picture})` }}
          ></div>
          <div className="offer__user__nickname">{offer.provider.nickname}</div>
          <div className="offer__created-at">
            {formatDateString(offer.createdAt)}
          </div>
          <div className="offer__zip">{offer.zip}</div>
          <div className="offer__city">{offer.city}</div>
        </div>
      </Card>
    </>
  );
};

Offer.propTypes = {
  offer: PropTypes.shape({
    provider: PropTypes.shape({
      sub: PropTypes.string,
      nickname: PropTypes.string,
      picture: PropTypes.string,
    }),
    book: PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      isbn: PropTypes.string,
      isbn13: PropTypes.string,
      authors: PropTypes.arrayOf(PropTypes.string),
      image: PropTypes.string,
    }),
    coordinates: PropTypes.arrayOf(PropTypes.number),
    zip: PropTypes.number,
    city: PropTypes.string,
    state: PropTypes.string,
    reservation: PropTypes.string,
    _id: PropTypes.string,
    createdAt: PropTypes.string,
  }),
};

Offer.defaultProps = {
  offer: {},
};
