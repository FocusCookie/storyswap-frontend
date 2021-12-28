import React, { useEffect, useState } from "react";
import "./Library.css";
import { useParams } from "react-router-dom";
import { Modal } from "../../components/Modal/Modal";
import { Button } from "../../components/Button/Button";
import { Select } from "../../components/Select/Select";
import { ReservationCard } from "../../components/ReservationCard/ReservationCard";

import { useAuth0 } from "@auth0/auth0-react";
import { useApiToken } from "../../contexts/apiToken.context";
import { useQuery, useMutation } from "react-query";
import {
  reservations as reservationsApi,
  offers as offersApi,
} from "../../services/api.servise";

export const Library = ({ ...props }) => {
  const { isAuthenticated } = useAuth0();
  const { apiTokenState } = useApiToken();
  const { init } = useParams();
  const [showCreationModal, setShowCreationModal] = useState(false);
  const selectLabels = [{ label: "reserviert" }, { label: "inseriert" }];
  const [selected, setSelected] = useState(selectLabels[0].label);
  const [requestReservations, setRequestReservations] = useState(false);
  const [unreserveOfferId, setUnreserveOfferId] = useState(null);
  const [reservations, setReservations] = useState([]);

  //!  weiter machen
  //TODO rausfinden, wieso beim reservieren und dann in die libary die reservierung nicht im get request auftaucht (caching evtl von react query?)

  const reservationRequest = useQuery("reservations", async () => {
    return await reservationsApi.getMyReservations(apiTokenState?.value);
  });

  const unreserveOfferRequest = useMutation((offerId) => {
    return offersApi.unreserveOffer(apiTokenState.value, offerId);
  });

  useEffect(() => {
    if (isAuthenticated && !requestReservations) {
      setRequestReservations(true);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (
      !reservationRequest.isLoading &&
      reservationRequest.isSuccess &&
      reservationRequest.data
    ) {
      if (reservationRequest.data.length > 0) {
        console.log(reservationRequest.data);
        setReservations(reservationRequest.data);
      }
    }
  }, [reservationRequest.isLoading]);

  useEffect(() => {
    if (init === "create-offer") setShowCreationModal(true);
  }, []);

  useEffect(() => {
    if (!unreserveOfferRequest.isLoading && unreserveOfferRequest.isSuccess) {
      console.log("unreserved");

      const updatedReservations = reservationRequest.data.filter(
        (reservation) => {
          return reservation.offer._id !== unreserveOfferId;
        }
      );
      setReservations(updatedReservations);
    }
  }, [unreserveOfferRequest.isLoading]);

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

  return (
    <div className="library-view">
      <Select
        items={selectLabels}
        preselected={selectLabels[0].label}
        onChange={handleSelectChange}
      />
      {selected === "reserviert" && (
        <div className="library-view__reserved">
          {reservations.length > 0 &&
            reservations.map((reservation) => (
              <ReservationCard
                key={reservation._id}
                reservation={reservation}
                onUnreserve={handleUnreserveOffer}
              />
            ))}
        </div>
      )}
      {selected === "inseriert" && (
        <div className="library-view__offers">
          <h1 className="headline">Inseriert</h1>
          <h1 className="headline">Inseriert</h1>
          <h1 className="headline">Inseriert</h1>
          <h1 className="headline">Inseriert</h1>
        </div>
      )}
      {showCreationModal && (
        <Modal>
          <div className="library-view-__create-offer-modal">
            <p>create new offer</p>
            <Button onClick={handleCancelOfferCreation}>abbrechen</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
