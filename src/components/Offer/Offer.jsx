import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import "./Offer.css";
import { Card } from "../Card/Card";
import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";
import { Map } from "../Map/Map";

export const Offer = ({ offer, ...props }) => {
  const [showOfferDetails, setShowOfferDetails] = useState(false);
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

  return (
    <>
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
              <Map center={[13.436831, 52.547466]} />
            </div>

            <Button size="xl" onClick={() => console.log("reserve")}>
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
    zip: PropTypes.number,
    city: PropTypes.string,
    state: PropTypes.string,
    _id: PropTypes.string,
    createdAt: PropTypes.string,
  }),
};

Offer.defaultProps = {
  offer: {},
};
