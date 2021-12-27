import React, { useState, useEffect } from "react";
import "./Home.css";
import { useMetadata } from "../../contexts/metadata.context";
import { useMutation } from "react-query";
import { useApiToken } from "../../contexts/apiToken.context";
import { Filter } from "../../components/Filter/Filter";
import { Offer } from "../../components/Offer/Offer";
import { offers } from "../../services/api.servise";
import isSearchingPerson from "../../assets/person/searching.png";

export const Home = ({ ...props }) => {
  const { apiTokenState } = useApiToken();
  const { metadataState: metadata } = useMetadata();
  const [initFilterValue, setInitFilterValue] = useState();

  //TODO: Filter wird nicht korrekt initialisiert. es werden keine werte angezeigt...

  const filteredOffers = useMutation((options) => {
    return offers.getOffersWithFilter(apiTokenState.value, options);
  });

  useEffect(() => {
    if ((metadata && metadata.city) || (metadata && metadata.zip)) {
      const initMetadataFilter = { city: metadata.city, zip: metadata.zip };
      setInitFilterValue(initMetadataFilter);
      filteredOffers.mutate({ filter: initMetadataFilter });
    }
  }, [metadata]);

  function handleNewFilter(value) {
    filteredOffers.mutate({ filter: value });
  }

  return (
    <div className="home-view">
      <Filter onFilter={handleNewFilter} initFilters={initFilterValue} />

      {filteredOffers.isLoading && (
        <div className="home-view__loading">
          <img
            src={isSearchingPerson}
            alt="Person seraches for offers on a Laptop"
          />
          <p>Suche nach Inseraten</p>
        </div>
      )}

      {!filteredOffers.isLoading &&
        filteredOffers.data &&
        filteredOffers.data.map((offer) => (
          <Offer key={offer._id} offer={offer} />
        ))}
    </div>
  );
};
