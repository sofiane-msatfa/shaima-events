import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken = 'pk.eyJ1IjoiaGF5aGV5IiwiYSI6ImNsZW55enozYTBvZ2kzem1xanQwcWllNWgifQ.aPkm8H1XGOZsyKYF1ryXZA';

export function MapboxComponent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const geocoderContainer = useRef<HTMLDivElement>(null);
  const [mapExpanded, setMapExpanded] = useState(false);
  const [previousWidth, setPreviousWidth] = useState(null);
  const [previousHeight, setPreviousHeight] = useState(null);

  const addGeocoderInput = (mapboxMap: mapboxgl.Map) => {
    if (!geocoderContainer.current) {
      return;
    }

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: true,
      placeholder: "Rechercher un lieu...",
      // container: geocoderInputContainer,
    });

    geocoder.addTo(geocoderContainer.current);
    mapboxMap.addControl(geocoder, "top-left");

    console.log({ geocoder });
    console.log("Geocoder added");
  };

  function addEventPins(mapboxMap: mapboxgl.Map) {
    const events = [
      { id: 1, name: "Event 1", location: { lng: 30.5, lat: 15.2 }, description: "Description 1" },
      { id: 2, name: "Event 2", location: { lng: 31, lat: 16 }, description: "Description 2" },
    ];

    for (const event of events) {
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(event.description);

      new mapboxgl.Marker()
        .setLngLat([event.location.lng, event.location.lat])
        .setPopup(popup)
        .addTo(mapboxMap);
    }

    console.log("Event pins added");
  }

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (mapContainer.current) {
      const mapboxMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/hayhey/clvp4mam001oo01qu8fe054qc",
        zoom: 2.5,
        center: [30, 15],
      });

      mapboxMap.addControl(new mapboxgl.NavigationControl(), "top-right");
      mapboxMap.on("style.load", () => {
        mapboxMap.setConfigProperty("basemap", "showPointOfInterestLabels", false);
      });

      addEventPins(mapboxMap);
      addGeocoderInput(mapboxMap);

      return () => {
        mapboxMap.remove();
      };
    }
  }, [addEventPins, addGeocoderInput]);

  const toggleMapSize = () => {
    if (!mapExpanded) {
      setPreviousWidth(mapContainer.current.style.width);
      setPreviousHeight(mapContainer.current.style.height);
      mapContainer.current.style.width = "100vw";
      mapContainer.current.style.height = "100vh";
      map.resize();
    } else {
      mapContainer.current.style.width = previousWidth;
      mapContainer.current.style.height = previousHeight;
      map.resize();
    }
    setMapExpanded(!mapExpanded);
  };

  return (
    <div
      style={{
        position: mapExpanded ? "relative" : "fixed",
        top: mapExpanded ? "auto" : 10,
        left: mapExpanded ? "auto" : "calc(25%)",
        width: mapExpanded ? "100%" : "50%",
        height: mapExpanded ? "100%" : "300px",
        transition: "all 0.3s",
        borderRadius: mapExpanded ? "0" : "15px",
        overflow: "hidden",
        margin: "auto",
      }}
    >
      <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />
      <div
        ref={geocoderContainer}
        className="geocoder-container"
        style={{ position: "absolute", top: 0, zIndex: 999 }}
      />
      {!mapExpanded && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(255, 255, 255, 0.8)",
            padding: "10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={toggleMapSize}
        >
          Cliquez pour agrandir la carte
        </div>
      )}
      {mapExpanded && (
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "calc(2rem + 10px)",
            padding: "5px 10px",
            background: "rgba(255, 255, 255, 0.8)",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={toggleMapSize}
        >
          Fermer
        </button>
      )}
    </div>
  );
}
