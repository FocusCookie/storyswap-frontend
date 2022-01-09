import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./OfferCard.css";
import { BookCard } from "../BookCard/BookCard";
import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";
import { Badge } from "../Badge/Badge";
import { User } from "../User/User";
import FallBackCover from "../../assets/book_small.jpg";
import GERMAN_TEXTS from "../../translations/german";
import ENGLISH_TEXTS from "../../translations/english";

export const OfferCard = ({
  offer,
  onContactCollector,
  onDelete,
  onPickedUp,
  english,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isPickingUp, setIsPickingUp] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const today = new Date();
  const until = new Date(offer.reservation ? offer.reservation.until : "");
  const timeDifferenceBetweenTodayAndUntil = until.getTime() - today.getTime();
  var daysLeftOfReservation = Math.round(
    timeDifferenceBetweenTodayAndUntil / (1000 * 60 * 60 * 24)
  );

  const [texts, setTexts] = useState(GERMAN_TEXTS);

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
  function bookVariantFromOfferState(state) {
    if (state === "pending") return "medium";
    if (state === "pickedup") return "primary";
    return "accent";
  }
  function labelFromOfferState(state) {
    if (english) {
      return state;
    } else {
      if (state === "pending") return "offen";
      if (state === "pickedup") return "abgeholt";
      return "reserviert";
    }
  }
  function contactCollectorHandler() {
    onContactCollector(offer.reservation.collector);
  }
  function handleDelete() {
    setIsDeleting(true);
    onDelete(offer._id);
  }
  function bookWasPickedupHandler() {
    setIsPickingUp(true);
    onPickedUp(offer._id);
  }
  return (
    <>
      <BookCard
        onClick={toggleDetails}
        imageUrl={offer.book.image ? offer.book.image : FallBackCover}
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
                {texts.components.offer_card.pickup_at} {offer.zip} {offer.city}
              </p>
            </div>

            <Button variant="text" onClick={handleDelete} loading={isDeleting}>
              {texts.components.offer_card.delete_offer}
            </Button>

            {offer?.reservation && offer.state === "reserved" && (
              <>
                <div className="offer-card__divider"></div>
                <User user={offer.reservation.collector} />
                <Badge fullwidth>
                  {`${daysLeftOfReservation} ${
                    daysLeftOfReservation > 1
                      ? texts.words.days
                      : texts.words.day
                  } ${labelFromOfferState(offer.state)} `}
                </Badge>
                <Button
                  disabled={isPickingUp}
                  variant="secondary"
                  onClick={contactCollectorHandler}
                >
                  {english
                    ? `${texts.words.contact_verb} ${offer.reservation.collector.nickname}`
                    : `${offer.reservation.collector.nickname} ${texts.words.contact_verb}`}
                </Button>
                <div className="offer-card__divider"></div>
              </>
            )}
            {offer?.reservation && (
              <Button
                variant="white"
                loading={isPickingUp}
                onClick={bookWasPickedupHandler}
              >
                {texts.components.offer_card.book_was_pickedup}
              </Button>
            )}
            <Button
              disabled={isPickingUp || isDeleting}
              onClick={toggleDetails}
            >
              {texts.words.close}
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
      state: PropTypes.oneOf(["reserved", "deleted", "pickedup", "expired"]),
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
  /**
   * click handler when the offer is deleted
   */
  onDelete: PropTypes.func,
  /**
   * enable english texts
   */
  english: PropTypes.bool,
};
OfferCard.defaultProps = {
  onContactCollector: undefined,
  onPickedUp: undefined,
  onDelete: undefined,
  english: false,
};
