import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Protocol } from "pmtiles";
import { getColors } from "../../constants";
import "./home-map.css";

const degreesPerSecond = 6;
const protocol = new Protocol();
maplibregl.addProtocol("pmtiles", protocol.tile);

let spinning = true;

export default function HomeMap() {
  const container = useRef(null);
  const [map, setMap] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const colors = getColors();

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
            id: "background",
            type: "background",
            paint: { "background-color": colors.page.bg.light },
          },
          {
            id: "countries-fill",
            source: "countries",
            "source-layer": "countries",
            type: "fill",
            paint: { "fill-color": colors.countries.fill.inactive.light },
          },
          {
            id: "countries-outline",
            source: "countries",
            "source-layer": "countries",
            type: "line",
            paint: {
              "line-width": 0.5,
              "line-color": colors.countries.outline.inactive.light,
            },
          },
        ],
      },
      center: [0, 20],
      zoom: 1.6,
      scrollZoom: false,
      touchZoomRotate: false,
      doubleClickZoom: false,
      boxZoom: false,
    });

    let frame = null;
    let last = performance.now();

    function spin(now) {
      const dt = (now - last) / 1000;
      last = now;

      if (spinning) {
        const c = m.getCenter();
        m.setCenter([c.lng + degreesPerSecond * dt, c.lat]);
      }

      frame = requestAnimationFrame(spin);
    }

    m.on("load", () => {
      m.setProjection({ type: "globe" });
      setMap(m);
      setLoaded(true);

      last = performance.now();
      frame = requestAnimationFrame(spin);
    });

    m.on("mousedown", () => (spinning = false));
    m.on("touchstart", () => (spinning = false));
    m.on("mouseup", () => (spinning = true));
    m.on("touchend", () => (spinning = true));

    return () => {
      cancelAnimationFrame(frame);
      m.remove();
      setMap(null);
      setLoaded(false);
    };
  }, []);

  return <div ref={container} className="home-map" />;
}
