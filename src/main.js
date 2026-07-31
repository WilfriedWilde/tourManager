import { Protocol } from "pmtiles";
import { getOrganizers } from "./fetch";

const protocol = new Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

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

const colors = {
  countries: {
    inactive: "#000000",
    active: "#c9c9c9",
    selected: "#00ff00",
  },
  countriesOutline: {
    inactive: "#000000",
    active: "#000000",
    selected: "#000000",
  },
  markers: {
    venue: "#006eff",
    festival: "#fff200",
  },
};

const organizers = await getOrganizers();
console.log(organizers);

const countries = getCountries(organizers);
console.log(countries);

function getCountries() {
  const countries = new Set(
    organizers.map((o) => {
      const country = o.country;
      return country.charAt(0).toUpperCase() + country.slice(1);
    }),
  );

  return [...countries];
}

map.on("load", () => {
  map.setProjection({ type: "globe" });
  updateCountries();
  showMarkers();
});

function updateCountries() {
  map.setPaintProperty("countries-fill", "fill-color", [
    "case",
    ["in", ["get", "ADMIN"], ["literal", countries]],
    colors.countries.active,
    colors.countries.inactive,
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
    colors.countriesOutline.active,
    colors.countriesOutline.inactive,
  ]);
}

function showMarkers() {
  organizers.forEach((o) => {
    console.log(o.latitude);
    let marker = new maplibregl.Marker({
      color:
        o.type === "venue" ? colors.markers.venue : colors.markers.festival,
    })
      .setLngLat([o.longitude, o.latitude])
      .addTo(map);
  });
}
