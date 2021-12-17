import React, { useState } from "react";
import PropTypes from "prop-types";
import "./OfferCard.css";
import { BookCard } from "../BookCard/BookCard";
import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";
import { Badge } from "../Badge/Badge";

export const OfferCard = ({ offer, onContactCollector, onPickedUp }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isPickingUp, setIsPickingUp] = useState(false);

  const today = new Date();
  const until = new Date(offer.reservation ? offer.reservation.until : "");
  const timeDifferenceBetweenTodayAndUntil = until.getTime() - today.getTime();
  var daysLeftOfReservation = Math.round(
    timeDifferenceBetweenTodayAndUntil / (1000 * 60 * 60 * 24)
  );

  function toggleDetails() {
    setShowDetails((lastState) => !lastState);
  }
  function bookVariantFromOfferState(state) {
    if (state === "pending") return "medium";
    if (state === "pickedup") return "primary";
    return "accent";
  }
  function labelFromOfferState(state) {
    if (state === "pending") return "offen";
    if (state === "pickedup") return "abgeholt";
    return "reserviert";
  }
  function contactCollectorHandler() {
    onContactCollector(offer.reservation.collector);
  }
  function bookWasPickedupHandler() {
    setIsPickingUp(true);
    onPickedUp(offer._id);
  }
  return (
    <>
      <BookCard
        onClick={toggleDetails}
        imageUrl={offer.book.image}
        variant={bookVariantFromOfferState(offer.state)}
        alt={offer.book.title}
        label={labelFromOfferState(offer.state)}
      />
      {showDetails && (
        <Modal>
          <div className="offer-card__modal">
            <div>
              <h1 className="offer-card__book-title">{offer.book.title}</h1>
              <p className="offer-card__book-author">
                {offer.book.authors.join(" & ")}
              </p>
            </div>
            <div>
              <p className="offer-card__zip-city">
                Abzuholen in {offer.zip} {offer.city}
              </p>
            </div>
            {offer?.reservation && offer.state === "reserved" && (
              <>
                <div className="offer-card__divider"></div>

                <div className="offer-card__collector">
                  <div
                    className="offer-card__collector__picture"
                    role="img"
                    style={{
                      backgroundImage: `url(${offer.reservation.collector.picture})`,
                    }}
                  ></div>
                  <div className="offer-card__collector__nickname ">
                    {offer.reservation.collector.nickname}
                  </div>
                </div>
                <Badge fullwidth>
                  {`${daysLeftOfReservation} ${
                    daysLeftOfReservation > 1 ? "Tage" : "Tag"
                  } ${labelFromOfferState(offer.state)} `}
                </Badge>
                <Button
                  disabled={isPickingUp}
                  variant="secondary"
                  onClick={contactCollectorHandler}
                >
                  {offer.reservation.collector.nickname} kontaktieren
                </Button>
                <div className="offer-card__divider"></div>
              </>
            )}
            {offer?.reservation && (
              <Button loading={isPickingUp} onClick={bookWasPickedupHandler}>
                Buch wurde abgeholt
              </Button>
            )}
            <Button
              disabled={isPickingUp}
              variant="secondary"
              onClick={toggleDetails}
            >
              schließen
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

OfferCard.propTypes = {
  /**
   * book offer
   */
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
    reservation: PropTypes.shape({
      _id: PropTypes.string,
      collector: PropTypes.shape({
        sub: PropTypes.string,
        nickname: PropTypes.string,
        picture: PropTypes.string,
      }),
      until: PropTypes.string,
      offer: PropTypes.string,
      state: ["pending", "reserved", "deleted", "pickedup"],
      __v: 0,
    }),
  }),
  /**
   * click handler when the contact collector button is clicked
   */
  onContactCollector: PropTypes.func,
  /**
   * click handler when the book was picked up button is clicked
   */
  onPickedUp: PropTypes.func,
};
OfferCard.defaultProps = {
  onContactCollector: undefined,
  onPickedUp: undefined,
};
