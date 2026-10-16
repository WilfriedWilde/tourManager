import { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Protocol } from "pmtiles";
import OrganizerMarkup from '../OrganizerMarkup';
import { getColors } from '../../constants';
import "./map.css"

const protocol = new Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

export default function Map({ organizers = [] }) {
  const container = useRef(null);
  const [map, setMap] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // create the map once
  useEffect(() => {
    const m = new maplibregl.Map({
      container: container.current,
      style: {
        version: 8,
        sources: {
          countries: {
            type: "vector",
            url: "pmtiles://countries.pmtiles",
          },
        },
        layers: [
          {
            id: "countries-fill",
            source: "countries",
            "source-layer": "countries",
            type: "fill",
          },
          {
            id: "countries-outline",
            source: "countries",
            "source-layer": "countries",
            type: "line",
            paint: { "line-width": 0.5 },
          },
        ],
      },
      center: [0, 20],
      zoom: 1,
    });

    m.on("load", () => {
      m.setProjection({ type: "globe" });
      setMap(m);
      setLoaded(true);
    });

    return () => {
      m.remove();
      setMap(null);
      setLoaded(false);
    };
  }, []);

  // update country colors when data changes
  useEffect(() => {
    if (!map || !loaded) return;
    updateCountries(map, getCountries(organizers));
  }, [map, loaded, organizers]);

  return (
    <>
      <div ref={container} className="map" />
      {map && organizers.map((o) => (
        <OrganizerMarkup key={o.id} map={map} organizer={o} />
      ))}
    </>
  );
}

function getCountries(organizers) {
  const countries = new Set(
    organizers.map((o) => {
      const country = o.country;
      return country.charAt(0).toUpperCase() + country.slice(1);
    }),
  );

  return [...countries];
}

function updateCountries(map, countries) {
  const colors = getColors();

  map.setPaintProperty("countries-fill", "fill-color", [
    "case",
    ["in", ["get", "ADMIN"], ["literal", countries]],
    colors.countries.fill.active.dark,
    colors.countries.fill.inactive.dark,
  ]);

  map.setPaintProperty("countries-fill", "fill-opacity", [
    "case",
    ["in", ["get", "ADMIN"], ["literal", countries]],
    0.7,
    1,
  ]);

  map.setPaintProperty("countries-outline", "line-color", [
    "case",
    ["in", ["get", "ADMIN"], ["literal", countries]],
    colors.countries.outline.active.dark,
    colors.countries.outline.inactive.dark,
  ]);
}
