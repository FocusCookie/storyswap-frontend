import React, { useState } from "react";
import PropTypes from "prop-types";
import "./ReservationCard.css";
import { Card } from "../Card/Card";
import { Badge } from "../Badge/Badge";
import { Modal } from "../Modal/Modal";
import { Offer } from "../Offer/Offer";
import { Button } from "../Button/Button";
import { BookCard } from "../BookCard/BookCard";

export const ReservationCard = ({
  reservation,
  onContactProvider,
  onUnreserve,
}) => {
  const today = new Date();
  const until = new Date(reservation.until);
  const timeDifferenceBetweenTodayAndUntil = until.getTime() - today.getTime();
  var daysLeftOfReservation = Math.round(
    timeDifferenceBetweenTodayAndUntil / (1000 * 60 * 60 * 24)
  );
  const [showDetails, setShowDetails] = useState(false);
  const [isUnreserving, setIsUnreserving] = useState(false);
  const bookCardLabel = `Noch ${daysLeftOfReservation} ${
    daysLeftOfReservation > 1 ? "Tage" : "Tag"
  }`;

  function toggleDetails() {
    setShowDetails((lastState) => !lastState);
  }

  function handleUnreserve() {
    setIsUnreserving(true);
    onUnreserve(reservation.offer._id);
  }
  function handleContactProvider() {
    onContactProvider(reservation.offer.provider);
  }

  return (
    <>
      <BookCard
        onClick={toggleDetails}
        imageUrl={reservation.offer.book.image}
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
              <Button disabled={isUnreserving} onClick={toggleDetails}>
                schließen
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
   * reserved set true if the offer is reserved successfully via the api
   */
};

ReservationCard.defaultProps = {
  reservation: {},
  onContactProvider: undefined,
  onUnreserve: undefined,
};
