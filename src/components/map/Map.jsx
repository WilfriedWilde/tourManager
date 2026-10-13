import { useEffect, useRef } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Protocol } from "pmtiles";
import { getOrganizers } from "../../hooks/fetch/fetch";
import { colors } from '../../constants';
import OrganizerPopup from '../organizerPopup/OrganizerPopup';
import OrganizerMarkup from '../OrganizerMarkup';

const protocol = new Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

export default function Map({ organizers }) {
  const container = useRef(null)
  const map = useRef(null)
  
  useEffect(() => {
    const map = new maplibregl.Map({
      container: "map",
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
            paint: {
              "line-width": 0.5,
            },
          },
        ],
      },
      center: [0, 20],
      zoom: 1,
    });

    map.on("load", () => {
      map.setProjection({ type: "globe" });
      updateCountries();
      addMarkers();
    });
    
    const countries = getCountries(organizers);
    console.log(countries);
    
    useEffect(() => {
      if (!map) return
      updateCountries()
    }, [map, organizers])
    
    function addMarkers() {
      organizers.forEach((o) => {

      });
    }

    return () => map.current.remove()
  }, [])

  return (
    <>
      <div ref={container} className='map'/>
      {map && organizers.map((o) => (
        <OrganizerMarkup key={o.id} map={map} organizer={o}/>
      ))}
    </>
  )
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

function updateCountries(countries) {
  map.setPaintProperty("countries-fill", "fill-color", [
    "case",
    ["in", ["get", "ADMIN"], ["literal", countries]],
    colors.countries.fill.active,
    colors.countries.fill.inactive,
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
    colors.countries.outline.active,
    colors.countries.outline.inactive,
  ]);
}
