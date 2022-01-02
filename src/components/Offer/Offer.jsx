import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Offer.css";
import { Card } from "../Card/Card";
import { Modal } from "../Modal/Modal";
import { Stepper } from "../Stepper/Stepper";
import { Button } from "../Button/Button";
import { Badge } from "../Badge/Badge";
import { Map } from "../Map/Map";
import { addDaysToToday } from "../../utils/utils";
import FallBackCover from "../../assets/book_small.jpg";

//TODO: Implement fall back cover if no image is provided with the book

export const Offer = ({
  offer,
  onReserveUntil,
  onUnreserve,
  onContactProvider,
  reserved,
  clean,
  ...props
}) => {
  const [showOfferDetails, setShowOfferDetails] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [daysToReserve, setDaysToReserve] = useState(1);
  const [isReserving, setIsReserving] = useState(false);
  const [isUnreserving, setIsUnreserving] = useState(false);

  useEffect(() => {
    if (reserved) {
      setShowReservationModal(false);
      setIsReserving(false);
    } else {
      setIsUnreserving(false);
    }
  }, [reserved]);

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
    setIsReserving(true);
  }

  function unreserveHandler() {
    setIsUnreserving(true);
    onUnreserve({
      id: offer._id,
    });
  }

  function contactProviderHandler() {
    onContactProvider(offer.provider);
  }
  return (
    <>
      {showReservationModal && !reserved && (
        <Modal>
          <div className="offer__reservation-modal">
            <h1 className="offer__reservation__title">Reservierung</h1>
            <Stepper onChange={handleStepper} disabled={isReserving} />
            <Button onClick={reserveHandler} loading={isReserving}>
              reservieren
            </Button>
            <Button
              variant="secondary"
              onClick={toggleReservationModal}
              disabled={isReserving}
            >
              zurück
            </Button>
          </div>
        </Modal>
      )}
      <Card
        clean={clean}
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
            style={{
              backgroundImage: `url(${
                offer.book.image ? offer.book.image : FallBackCover
              })`,
            }}
            onClick={toggleOfferDetails}
          ></div>
        )}

        {showOfferDetails && (
          <div className="offer__details">
            <div className="offer__map">
              <Map center={offer.coordinates} />
            </div>

            {!reserved && (
              <Button size="xl" onClick={toggleReservationModal}>
                reservieren
              </Button>
            )}
            {reserved && (
              <Button
                size="xl"
                variant="secondary"
                loading={isUnreserving}
                onClick={unreserveHandler}
              >
                reservierung stornieren
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={contactProviderHandler}
              disabled={isUnreserving}
            >
              anbieter kontaktieren
            </Button>
            <Button
              variant="secondary"
              onClick={toggleOfferDetails}
              disabled={isUnreserving}
            >
              zurück
            </Button>
          </div>
        )}

        {reserved && !showOfferDetails && (
          <div className="offer__reserved-badge">
            <Badge variant="primary" fullwidth>
              Reserviert
            </Badge>
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
  /**
   * unreserve handler
   */
  onUnreserve: PropTypes.func,
  /**
   * reserved set true if the offer is reserved successfully via the api
   */
  reserved: PropTypes.bool,
  /**
   * no shadow, border and background
   */
  clean: PropTypes.bool,
};

Offer.defaultProps = {
  offer: {},
  onReserveUntil: undefined,
  onContactProvider: undefined,
  reserved: false,
  onUnreserve: undefined,
  clean: false,
};
