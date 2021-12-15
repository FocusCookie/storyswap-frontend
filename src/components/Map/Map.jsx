import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

//TODO: Add marker as props!

const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(13.436831);
  const [lat, setLat] = useState(52.547466);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 13,
      boxZoom: false,
      scrollZoom: false,
    });

    const el = document.createElement("div");
    el.className = "map__marker";

    const marker = new mapboxgl.Marker(el)
      .setLngLat([13.436831, 52.547466])
      .addTo(map);

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="map-container" ref={mapContainerRef}></div>;
};

export default Map;
