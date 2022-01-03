import React, { useEffect, useState } from "react";
import "./Library.css";
import { useMetadata } from "../../contexts/metadata.context";
import { useNavigate } from "react-router-dom";
import { useReceiver } from "../../contexts/receiver.context";
import { useParams } from "react-router-dom";
import { Modal } from "../../components/Modal/Modal";
import { Button } from "../../components/Button/Button";
import { Select } from "../../components/Select/Select";
import { ReservationCard } from "../../components/ReservationCard/ReservationCard";
import { OfferCard } from "../../components/OfferCard/OfferCard";
import { Input } from "../../components/Input/Input";
import calmPerson from "../../assets/person/calm.png";
import happyPerson from "../../assets/person/smilling.png";

import { useApiToken } from "../../contexts/apiToken.context";
import { useQuery, useMutation } from "react-query";
import {
  reservations as reservationsApi,
  offers as offersApi,
  books as bookApi,
} from "../../services/api.servise";

export const Library = ({ ...props }) => {
  const { apiTokenState } = useApiToken();
  const { metadataState: metadata } = useMetadata();
  const { receiverDispatch } = useReceiver();
  const navigate = useNavigate();
  const { init } = useParams();
  const [showCreationModal, setShowCreationModal] = useState(false);
  const selectLabels = [{ label: "reserviert" }, { label: "inseriert" }];
  const [selected, setSelected] = useState(selectLabels[0].label);
  const [unreserveOfferId, setUnreserveOfferId] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [myOffers, setMyOffers] = useState([]);
  const [reservationPickedupId, setReservationPickedupId] = useState(null);
  const [offerPickedupId, setOfferPickedupId] = useState(null);
  const [isbn, setIsbn] = useState("");
  const [isbnError, setIsbnError] = useState("");
  const [bookForOffer, setBookForOffer] = useState(null);
  const [bookWasCreated, setBookWasCreated] = useState(false);
  const [deletedOfferId, setDeletedOfferId] = useState(null);

  const reservationRequest = useQuery("reservations", async () => {
    return await reservationsApi.getMyReservations(apiTokenState.value);
  });

  const offersRequest = useQuery("offers", async () => {
    return await offersApi.getMyOffers(apiTokenState.value);
  });

  const unreserveOfferRequest = useMutation((offerId) => {
    return offersApi.unreserveOffer(apiTokenState.value, offerId);
  });

  const reservationPickedupRequest = useMutation((reservationId) => {
    return reservationsApi.wasPickedup(apiTokenState.value, reservationId);
  });

  const offerPickedupRequest = useMutation((offerId) => {
    return offersApi.wasPickedup(apiTokenState.value, offerId);
  });

  const checkIsbnRequest = useMutation((isbn) => {
    return bookApi.checkIsbn(apiTokenState.value, isbn);
  });

  const deleteOfferRequest = useMutation((id) => {
    return offersApi.delete(apiTokenState.value, id);
  });

  const createOfferRequest = useMutation((options) => {
    return offersApi.create(apiTokenState.value, options);
  });

  // If route has create param show creation modal
  useEffect(() => {
    if (init === "create-offer") {
      setShowCreationModal(true);
      setBookWasCreated(false);
    }
  }, []);

  useEffect(() => {
    if (!reservationRequest.isFetching && reservationRequest.isSuccess) {
      if (reservationRequest.data.length > 0) {
        setReservations(reservationRequest.data);
      }
    }
  }, [reservationRequest.isFetching]);

  useEffect(() => {
    if (offersRequest.isSuccess) {
      if (offersRequest.data.length > 0) {
        setMyOffers(offersRequest.data);
      }
    }
  }, [offersRequest.isLoading]);

  useEffect(() => {
    if (!unreserveOfferRequest.isLoading && unreserveOfferRequest.isSuccess) {
      const updatedReservations = reservations.filter((reservation) => {
        return reservation.offer._id !== unreserveOfferId;
      });
      setReservations(updatedReservations);
    }
  }, [unreserveOfferRequest.isLoading]);

  useEffect(() => {
    if (
      !reservationPickedupRequest.isLoading &&
      reservationPickedupRequest.isSuccess
    ) {
      const updatedReservations = reservations.filter((reservation) => {
        return reservation._id !== reservationPickedupId;
      });

      setReservations(updatedReservations);
    }
  }, [reservationPickedupRequest.isLoading]);

  useEffect(() => {
    if (!offerPickedupRequest.isLoading && offerPickedupRequest.isSuccess) {
      const updatedMyOffers = myOffers.filter((offer) => {
        return offer._id !== offerPickedupId;
      });

      setMyOffers(updatedMyOffers);
    }
  }, [offerPickedupRequest.isLoading]);

  useEffect(() => {
    if (!checkIsbnRequest.isLoading && checkIsbnRequest.isSuccess) {
      setBookForOffer(checkIsbnRequest.data);
    }
  }, [checkIsbnRequest.isLoading]);

  useEffect(() => {
    if (!createOfferRequest.isLoading && createOfferRequest.isSuccess) {
      setBookWasCreated(true);
    }
  }, [createOfferRequest.isLoading]);

  useEffect(() => {
    if (!deleteOfferRequest.isLoading && deleteOfferRequest.isSuccess) {
      const updatedMyOffers = myOffers.filter((offer) => {
        return offer._id !== deletedOfferId;
      });
      setMyOffers(updatedMyOffers);

      setDeletedOfferId(null);
    }
  }, [deleteOfferRequest.isLoading]);

  function handleCancelOfferCreation() {
    setShowCreationModal(false);
    setBookWasCreated(false);
  }

  function handleSelectChange(item) {
    setSelected(item);
  }

  function handleUnreserveOffer(id) {
    setUnreserveOfferId(id);
    unreserveOfferRequest.mutate(id);
  }

  function handleOfferWasPickedUp(id) {
    setOfferPickedupId(id);
    offerPickedupRequest.mutate(id);
  }

  function handleReservationWasPickedUp(id) {
    setReservationPickedupId(id);
    reservationPickedupRequest.mutate(id);
  }

  function contactUser(user) {
    receiverDispatch({ type: "setReceiver", payload: user });
    navigate(`/messages/sub/${user.sub}`);
  }

  function handleGoToHome() {
    navigate("/home");
  }

  function handleOpenCreateOffer() {
    setShowCreationModal(true);
    setBookWasCreated(false);
  }

  function handleIsbnChange(value) {
    setIsbn(value);
  }

  function handleCheckIsbn() {
    setIsbnError("");

    if (
      isbn.length < 9 ||
      (isbn.length > 10 && isbn.length < 13) ||
      isbn.length > 13
    ) {
      setIsbnError("Die ISBN muss 9,10 oder 13 stellig sein.");
    } else {
      checkIsbnRequest.mutate(isbn);
    }
  }

  function backToIsbnCheckHandler() {
    setBookForOffer(null);
  }

  function createOfferHandler() {
    const options = {
      book: bookForOffer._id,
      zip: parseInt(metadata.zip),
      city: metadata.city,
    };

    createOfferRequest.mutate(options);
  }

  function handleBackToOffers() {
    const newCreatedOffer = createOfferRequest.data;
    newCreatedOffer.book = bookForOffer;
    const newOffers = [...myOffers, newCreatedOffer];

    setMyOffers(newOffers);
    setBookWasCreated(false);
    setBookForOffer(null);
    setShowCreationModal(false);
  }

  function handleDeleteOffer(id) {
    setDeletedOfferId(id);
    deleteOfferRequest.mutate(id);
  }

  return (
    <div className="library-view">
      <Select
        items={selectLabels}
        preselected={selectLabels[0].label}
        onChange={handleSelectChange}
      />
      {selected === "reserviert" && (
        <div className="library-view__reserved">
          {reservations.length === 0 && (
            <div className="library-view__message">
              <img src={calmPerson} alt="Calm person with a coffe cup" />
              <p>
                Du hast keine Reservierungen derzeitig. Schau doch mal nach ob
                du nicht vielleicht ein neues Lieblingsbuch endeckst🕵️‍♂️ !
              </p>
              <Button onClick={handleGoToHome}>Zu den Inseraten</Button>
            </div>
          )}

          <div className="library-view__reserved__offers">
            {reservations.length > 0 &&
              reservations.map((reservation) => (
                <ReservationCard
                  onContactProvider={contactUser}
                  key={reservation._id}
                  reservation={reservation}
                  onUnreserve={handleUnreserveOffer}
                  onPickedUp={handleReservationWasPickedUp}
                />
              ))}
          </div>
        </div>
      )}
      {selected === "inseriert" && (
        <div className="library-view__offers">
          {myOffers.length > 0 && (
            <div className="library-view__offers__myOffers">
              {myOffers.map((offer) => (
                <OfferCard
                  key={offer._id}
                  offer={offer}
                  onContactCollector={contactUser}
                  onPickedUp={handleOfferWasPickedUp}
                  onDelete={handleDeleteOffer}
                />
              ))}
            </div>
          )}

          {myOffers.length === 0 && (
            <div className="library-view__message">
              <img src={calmPerson} alt="Calm person with a coffe cup" />
              <p>
                Du hast noch kein Inserat eingestellt. Erstelle eins um anderen
                Nutzern die Möglichkeit zu geben Ihr neues Lieblignsbuch ❤️ zu
                finden.
              </p>
            </div>
          )}

          <Button onClick={handleOpenCreateOffer}>Inserat erstellen</Button>
        </div>
      )}
      {showCreationModal && (
        <Modal>
          <div className="library-view__create-offer-modal">
            {!bookForOffer && !bookWasCreated && (
              <div className="flex flex-col gap-4">
                <h1 className="headline text-center">Neues Inserat 📚 </h1>
                <p className="text-center">
                  Um ein neues Inserat anlegenzulegen gebe einfach die ISBN oder
                  ISBN13 deines Buches ein. Wir werden anschließend alle
                  notwendigen Informationen zuammentragen und automatisch 🤖 für
                  dich ergänzen.
                </p>
                <Input
                  value={isbn}
                  onChange={handleIsbnChange}
                  label="ISBN oder ISBN13"
                  type="text"
                  disabled={false}
                  error={isbnError}
                />

                <Button
                  size="xl"
                  loading={checkIsbnRequest.isLoading}
                  onClick={handleCheckIsbn}
                >
                  Überprüfe ISBN
                </Button>
              </div>
            )}

            {bookForOffer && !bookWasCreated && (
              <div className="flex flex-col gap-4">
                <h2 className="headline">{bookForOffer.title}</h2>
                <p className="offer__author">
                  VON {bookForOffer.authors.join(" & ")}
                </p>

                <img
                  src={bookForOffer.image}
                  alt={bookForOffer.title}
                  className="rounded"
                />

                <p className="font-bold text-center">
                  Angeboten in {metadata.zip}, {metadata.city}
                </p>

                <Button size="xl" onClick={createOfferHandler}>
                  erstellen
                </Button>

                <Button variant="secondary" onClick={backToIsbnCheckHandler}>
                  zurück
                </Button>
              </div>
            )}

            {!bookWasCreated && (
              <Button
                variant="secondary"
                disabled={checkIsbnRequest.isLoading}
                onClick={handleCancelOfferCreation}
              >
                abbrechen
              </Button>
            )}

            {bookWasCreated && (
              <div className="library-view__message">
                <img src={happyPerson} alt="Happy person with a coffe cup" />
                <p className="text-center">
                  Dein Buch 📖 wurde erfolgreich inseriert und ist nun für
                  andere Nutzer sichtbar 🎉.
                </p>
                <Button onClick={handleBackToOffers}>
                  zurück zu meinen Inseraten
                </Button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};
