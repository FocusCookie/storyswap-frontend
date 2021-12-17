import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Offer.css";
import { Card } from "../Card/Card";
import { Modal } from "../Modal/Modal";
import { Stepper } from "../Stepper/Stepper";
import { Button } from "../Button/Button";
import { Map } from "../Map/Map";
import { addDaysToToday } from "../../utils/utils";

export const Offer = ({
  offer,
  onReserveUntil,
  onContactProvider,
  ...props
}) => {
  const [showOfferDetails, setShowOfferDetails] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [daysToReserve, setDaysToReserve] = useState(1);

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

  function handleStepper(days) {
    setDaysToReserve(days);
  }

  function reserveHandler() {
    const until = addDaysToToday(daysToReserve);
    onReserveUntil({
      id: offer._id,
      until: until,
    });
  }

  function contactProviderHandler() {
    onContactProvider(offer.provider);
  }
  return (
    <>
      {showReservationModal && (
        <Modal>
          <div className="offer__reservation-modal">
            <h1 className="offer__reservation__title">Reservierung</h1>
            <Stepper onChange={handleStepper} />
            <Button onClick={reserveHandler}>reservieren</Button>
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
            <Button variant="secondary" onClick={contactProviderHandler}>
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
  /**
   * the offer object from the api
   */
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
  /**
   * click handler when the user hits reservate - it give the until date
   */
  onReserveUntil: PropTypes.func,
  /**
   * click handler when the contact provider btn is clicked
   */
  onContactProvider: PropTypes.func,
};

Offer.defaultProps = {
  offer: {},
  onReserveUntil: undefined,
  onContactProvider: undefined,
};
