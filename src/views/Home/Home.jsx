import React, { useState, useEffect } from "react";
import "./Home.css";
import { useMetadata } from "../../contexts/metadata.context";
import { Filter } from "../../components/Filter/Filter";

export const Home = ({ ...props }) => {
  const { metadataState: metadata } = useMetadata();
  const [filter, setFilter] = useState({});

  useEffect(() => {
    if (metadata?.city || metadata?.zip) {
      setFilter({ city: metadata.city, zip: metadata.zip });
    }
  }, []);

  return (
    <div className="home-view">
      <Filter initFilters={filter} />
      <h1>{filter.city}</h1>
    </div>
  );
};
