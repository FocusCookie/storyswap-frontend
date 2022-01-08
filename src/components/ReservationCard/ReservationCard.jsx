import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./ReservationCard.css";
import { Modal } from "../Modal/Modal";
import { Offer } from "../Offer/Offer";
import { Button } from "../Button/Button";
import { BookCard } from "../BookCard/BookCard";
import FallBackCover from "../../assets/book_small.jpg";
import GERMAN_TEXTS from "../../translations/german";
import ENGLISH_TEXTS from "../../translations/english";

export const ReservationCard = ({
  reservation,
  onContactProvider,
  onUnreserve,
  onPickedUp,
  english,
}) => {
  const today = new Date();
  const until = new Date(reservation.until);
  const timeDifferenceBetweenTodayAndUntil = until.getTime() - today.getTime();
  var daysLeftOfReservation = Math.round(
    timeDifferenceBetweenTodayAndUntil / (1000 * 60 * 60 * 24)
  );
  const [showDetails, setShowDetails] = useState(false);
  const [isUnreserving, setIsUnreserving] = useState(false);
  const [isPickingUp, setIsPickingUp] = useState(false);
  const [texts, setTexts] = useState(GERMAN_TEXTS);

  const bookCardLabel = english
    ? `${daysLeftOfReservation} ${
        daysLeftOfReservation > 1 ? texts.words.days : texts.words.day
      } left`
    : `Noch ${daysLeftOfReservation} ${
        daysLeftOfReservation > 1 ? texts.words.days : texts.words.day
      }`;

  useEffect(() => {
    if (english) {
      setTexts(ENGLISH_TEXTS);
    } else {
      setTexts(GERMAN_TEXTS);
    }
  }, [english]);

  function toggleDetails() {
    setShowDetails((lastState) => !lastState);
  }

  function handleUnreserve() {
    setIsUnreserving(true);
    onUnreserve(reservation.offer._id);
    setShowDetails(false);
  }
  function handleContactProvider() {
    onContactProvider(reservation.offer.provider);
  }
  function bookWasPickedupHandler() {
    setIsPickingUp(true);
    onPickedUp(reservation._id);
  }

  return (
    <>
      <BookCard
        onClick={toggleDetails}
        imageUrl={
          reservation.offer.book.image
            ? reservation.offer.book.image
            : FallBackCover
        }
        variant={daysLeftOfReservation <= 1 ? "accent" : "medium"}
        alt={reservation.offer.book.title}
        label={bookCardLabel}
      />

      {showDetails && (
        <>
          <Modal paddingoff>
            <Offer
              offer={reservation.offer}
              reserved
              clean
              onUnreserve={handleUnreserve}
              onContactProvider={handleContactProvider}
            />
            <div className="reservation-card__modal">
              <Button loading={isPickingUp} onClick={bookWasPickedupHandler}>
                {texts.components.reservation_card.book_was_pickedup}
              </Button>
              <Button
                variant="secondary"
                disabled={isUnreserving || isPickingUp}
                onClick={toggleDetails}
              >
                {texts.words.close}
              </Button>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

ReservationCard.propTypes = {
  /**
   * reservation object from the api
   */
  reservation: PropTypes.shape({
    _id: PropTypes.string,
    collector: PropTypes.shape({
      sub: PropTypes.string,
      nickname: PropTypes.string,
      picture: PropTypes.string,
    }),
    until: PropTypes.string,
    offer: PropTypes.shape({
      _id: PropTypes.string,
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
        image: PropTypes.string,
        authors: PropTypes.arrayOf(PropTypes.string),
      }),
      coordinates: PropTypes.arrayOf(PropTypes.number),
      zip: PropTypes.number,
      city: PropTypes.string,
      state: PropTypes.oneOf(["pending", "reserved", "deleted", "pickedup"]),
      createdAt: PropTypes.string,
      reservation: PropTypes.string,
    }),
    state: PropTypes.oneOf(["reserved", "deleted", "pickedup", "expired"]),
  }),
  /**
   * click handler when the contact provider btn is clicked
   */
  onContactProvider: PropTypes.func,
  /**
   * unreserve handler
   */
  onUnreserve: PropTypes.func,
  /**
   * click handler when the book was picked up button is clicked
   */
  onPickedUp: PropTypes.func,
  /**
   * enable english texts
   */
  english: PropTypes.bool,
};

ReservationCard.defaultProps = {
  reservation: {},
  onContactProvider: undefined,
  onUnreserve: undefined,
  onPickedUp: undefined,
  english: false,
};
