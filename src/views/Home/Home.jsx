import React, { useState, useEffect } from "react";
import "./Home.css";
import { useMetadata } from "../../contexts/metadata.context";
import { useMutation } from "react-query";
import { useApiToken } from "../../contexts/apiToken.context";
import { Filter } from "../../components/Filter/Filter";
import { Button } from "../../components/Button/Button";
import { Offer } from "../../components/Offer/Offer";
import { offers as offersApi } from "../../services/api.servise";
import isSearchingPerson from "../../assets/person/searching.png";
import isSadPerson from "../../assets/person/sad.png";

export const Home = ({ ...props }) => {
  const { apiTokenState } = useApiToken();
  const { metadataState: metadata } = useMetadata();
  const [initFilterValue, setInitFilterValue] = useState();
  const [offers, setOffers] = useState([]);
  const [lastOfferId, setLastOfferId] = useState(null);
  const [filter, setFilter] = useState({});
  const [isLoadingMoreOffers, setIsLoadingMoreOffers] = useState(false);
  const [hideMore, setHideMore] = useState(false);

  //TODO: Fix scroll bug when more offers are fetched and added, it scrolls currently to the top

  const offersRequest = useMutation((options) => {
    return offersApi.getOffersWithFilter(apiTokenState.value, options);
  });

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

        if (isLoadingMoreOffers) setIsLoadingMoreOffers(false);

        if (newOffers.length < 10) setHideMore(true);
      }
    }
  }, [offersRequest.isLoading]);

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
    console.log("erstellen");
  }

  return (
    <div className="home-view" enableResetScrollToCoords={false}>
      {initFilterValue && (
        <Filter onFilter={handleNewFilter} initFilters={initFilterValue} />
      )}

      {offersRequest.isLoading && offers.length === 0 && (
        <div className="home-view__loading">
          <img
            src={isSearchingPerson}
            alt="Person seraches for offers on a Laptop"
          />
          <p>Suche nach Inseraten</p>
        </div>
      )}

      {offers.length === 0 &&
        offersRequest.isSuccess &&
        !offersRequest.isLoading && (
          <div className="home-view__loading">
            <img src={isSadPerson} alt="Sad person" />
            <p>
              Wir konnten leider keine Inserate finden. Du kannst die Suchfilter
              ändern, um mehr Angebote zu finden oder erstelle ein Inserat.{" "}
            </p>
            <Button onClick={handleCreateOffer}>Erstelle ein Inserat</Button>
          </div>
        )}

      {!offersRequest.isLoading &&
        offers &&
        offers.map((offer) => <Offer key={offer._id} offer={offer} />)}

      {!offersRequest.isLoading && offers.length > 0 && !hideMore && (
        <Button loading={isLoadingMoreOffers} onClick={handleLoadMoreOffers}>
          Weitere laden
        </Button>
      )}
    </div>
  );
};
