import React, { useEffect, useState } from "react";
import "./Library.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Modal } from "../../components/Modal/Modal";
import { Button } from "../../components/Button/Button";
import { Select } from "../../components/Select/Select";
import { ReservationCard } from "../../components/ReservationCard/ReservationCard";
import { OfferCard } from "../../components/OfferCard/OfferCard";
import calmPerson from "../../assets/person/calm.png";

import { useApiToken } from "../../contexts/apiToken.context";
import { useQuery, useMutation } from "react-query";
import {
  reservations as reservationsApi,
  offers as offersApi,
} from "../../services/api.servise";

//TODO offer creation

export const Library = ({ ...props }) => {
  const { apiTokenState } = useApiToken();
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

  // If route has create param show creation modal
  useEffect(() => {
    if (init === "create-offer") setShowCreationModal(true);

    console.log("reservations ", reservations);
    console.log("reservationRequest.data", reservationRequest.data);
  }, []);

  useEffect(() => {
    if (!reservationRequest.isFetching && reservationRequest.isSuccess) {
      console.log(reservationRequest.data);
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
      console.log("unreserved");

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
      console.log("reservation pickedup");

      const updatedReservations = reservations.filter((reservation) => {
        return reservation._id !== reservationPickedupId;
      });

      setReservations(updatedReservations);
    }
  }, [reservationPickedupRequest.isLoading]);

  useEffect(() => {
    if (!offerPickedupRequest.isLoading && offerPickedupRequest.isSuccess) {
      console.log("offer pickedup");

      const updatedMyOffers = myOffers.filter((offer) => {
        return offer._id !== offerPickedupId;
      });

      setMyOffers(updatedMyOffers);
    }
  }, [offerPickedupRequest.isLoading]);

  function handleCancelOfferCreation() {
    setShowCreationModal(false);
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

  function contactUser(details) {
    navigate(`/messages/${details.sub}`);
  }

  function handleGoToHome() {
    navigate("/home");
  }

  function handleOpenCreateOffer() {
    setShowCreationModal(true);
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
            <p>create new offer</p>
            <Button onClick={handleCancelOfferCreation}>abbrechen</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
