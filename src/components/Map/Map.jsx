import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl";
import "./Map.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export const Map = ({ center, marker, ...props }) => {
  const mapContainerRef = useRef(null);
  const defaultCenter = [13.409642496568159, 52.52081512666537];

  const [lng, setLng] = useState(center[0] || defaultCenter[0]);
  const [lat, setLat] = useState(center[1] || defaultCenter[1]);

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

    if (marker) {
      const el = document.createElement("div");
      el.className = "map__marker";

      const marker = new mapboxgl.Marker(el).setLngLat([lng, lat]).addTo(map);
    }

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="map-container" ref={mapContainerRef} {...props}></div>;
};

Map.propTypes = {
  /**
   * coordinates whith which the map is initialized and the marker is set if the marker is active (no changes will be applied while runtime)
   */
  center: PropTypes.arrayOf(PropTypes.number),
  /**
   * shows a marker/circle in the center of the map (center coordinates)
   */
  marker: PropTypes.bool,
};
Map.defaultProps = {
  center: [],
  marker: true,
};
