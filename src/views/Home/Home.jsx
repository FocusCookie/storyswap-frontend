import React, { useState, useEffect } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useMetadata } from "../../contexts/metadata.context";
import { useReceiver } from "../../contexts/receiver.context";
import { useMutation } from "react-query";
import { useApiToken } from "../../contexts/apiToken.context";
import { Filter } from "../../components/Filter/Filter";
import { Button } from "../../components/Button/Button";
import { Offer } from "../../components/Offer/Offer";
import { offers as offersApi } from "../../services/api.servise";
import isSearchingPerson from "../../assets/person/searching.png";
import isSadPerson from "../../assets/person/sad.png";
import { useLanguage } from "../../contexts/language.context";
import GERMAN_TEXTS from "../../translations/german";
import ENGLISH_TEXTS from "../../translations/english";

export const Home = ({ ...props }) => {
  const { languageState } = useLanguage();
  const { apiTokenState } = useApiToken();
  const { metadataState: metadata } = useMetadata();
  const { receiverDispatch } = useReceiver();
  const navigate = useNavigate();
  const [initFilterValue, setInitFilterValue] = useState();
  const [offers, setOffers] = useState([]);
  const [lastOfferId, setLastOfferId] = useState(null);
  const [filter, setFilter] = useState({});
  const [isLoadingMoreOffers, setIsLoadingMoreOffers] = useState(false);
  const [hideMore, setHideMore] = useState(false);
  const [pageYOffset, setPageYOffset] = useState(0);
  const [reserveOfferDetails, setReserveOfferDetails] = useState(null);
  const [texts, setTexts] = useState(ENGLISH_TEXTS);

  const offersRequest = useMutation((options) => {
    return offersApi.getOffersWithFilter(apiTokenState.value, options);
  });
  const reserveOfferRequest = useMutation((options) => {
    return offersApi.reserveOffer(apiTokenState.value, options);
  });
  const unreserveOfferRequest = useMutation((offerId) => {
    return offersApi.unreserveOffer(apiTokenState.value, offerId);
  });

  //TODO: Fix scrollto its visible that the content moves up and fast down again

  //TODO: implement error handling for example if the offer is reserved already and the user tries to reserve it again.

  useEffect(() => {
    if (languageState === "de-DE") {
      setTexts(GERMAN_TEXTS);
    } else {
      setTexts(ENGLISH_TEXTS);
    }
  }, [languageState]);

  useEffect(() => {
    if ((metadata && metadata.city) || (metadata && metadata.zip)) {
      const initMetadataFilter = { city: metadata.city, zip: metadata.zip };
      setInitFilterValue(initMetadataFilter);
      setFilter({ filter: initMetadataFilter });
      offersRequest.mutate({ filter: initMetadataFilter });
    }
  }, [metadata]);

  useEffect(() => {
    if (
      !offersRequest.isLoading &&
      offersRequest.isSuccess &&
      offersRequest.data
    ) {
      const newOffers = offersRequest.data;

      if (newOffers.length > 0) {
        setLastOfferId(newOffers[newOffers.length - 1]._id);

        setOffers((lastOffers) => [...lastOffers, ...newOffers]);

        window.scrollTo(0, pageYOffset);

        if (isLoadingMoreOffers) setIsLoadingMoreOffers(false);

        if (newOffers.length < 10) setHideMore(true);
      }
    }
  }, [offersRequest.isLoading]);

  useEffect(() => {
    if (!reserveOfferRequest.isLoading && reserveOfferRequest.isSuccess) {
      const updatedOfferInOffers = offers.map((offer) => {
        if (offer._id === reserveOfferDetails.id) offer.reserved = true;

        return offer;
      });
      setOffers(updatedOfferInOffers);
    }
  }, [reserveOfferRequest.isLoading]);

  useEffect(() => {
    if (!unreserveOfferRequest.isLoading && unreserveOfferRequest.isSuccess) {
      const updatedOfferInOffers = offers.map((offer) => {
        if (offer._id === reserveOfferDetails.id) offer.reserved = false;

        return offer;
      });
      setOffers(updatedOfferInOffers);
    }
  }, [unreserveOfferRequest.isLoading]);

  function handleNewFilter(value) {
    setOffers([]);
    setFilter({ filter: value });
    setHideMore(false);

    offersRequest.mutate({
      filter: value,
    });
  }

  function handleLoadMoreOffers() {
    setIsLoadingMoreOffers(true);

    const yOffset = window.pageYOffset;
    setPageYOffset(yOffset);

    const newFilterWithLastOfferID = {
      filter: filter.filter,
      lastFetchedOfferId: lastOfferId,
    };

    setFilter(newFilterWithLastOfferID);

    offersRequest.mutate({
      filter: newFilterWithLastOfferID,
      lastFetchedOfferId: lastOfferId,
    });
  }

  function handleCreateOffer() {
    navigate(`/library/create-offer`);
  }

  function handleContactProvider(provider) {
    receiverDispatch({ type: "setReceiver", payload: provider });
    navigate(`/messages/sub/${provider.sub}`);
    //TODO: implement the book in the first message automatically
  }

  function handleReserveOffer(details) {
    const reserveOptions = { id: details.id, until: details.until };

    setReserveOfferDetails(reserveOptions);
    reserveOfferRequest.mutate(reserveOptions);
  }

  function handleUnreserveOffer(details) {
    unreserveOfferRequest.mutate(details.id);
  }

  return (
    <div className="home-view">
      {initFilterValue && (
        <Filter onFilter={handleNewFilter} initFilters={initFilterValue} />
      )}

      {offersRequest.isLoading && offers.length === 0 && (
        <div className="home-view__loading">
          <img
            src={isSearchingPerson}
            alt="Person seraches for offers on a Laptop"
          />
          <p>{texts.home.loading_offer_message}</p>
        </div>
      )}

      {offers.length === 0 &&
        offersRequest.isSuccess &&
        !offersRequest.isLoading && (
          <div className="home-view__loading">
            <img src={isSadPerson} alt="Sad person" />
            <p>{texts.home.no_offers_message}</p>
            <Button onClick={handleCreateOffer}>
              {texts.home.create_button_label}
            </Button>
          </div>
        )}

      {!offersRequest.isLoading &&
        offers &&
        offers.map((offer) => (
          <Offer
            key={offer._id}
            offer={offer}
            onContactProvider={handleContactProvider}
            onReserveUntil={handleReserveOffer}
            onUnreserve={handleUnreserveOffer}
            reserved={offer.reserved}
          />
        ))}

      {!offersRequest.isLoading && offers.length > 0 && !hideMore && (
        <Button loading={isLoadingMoreOffers} onClick={handleLoadMoreOffers}>
          {texts.home.load_more_button_label}
        </Button>
      )}
    </div>
  );
};
