import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import * as maplibregl from "maplibre-gl";
import OrganizerPopup from "./organizerPopup/OrganizerPopup";
import { getColors } from "../constants";

export default function OrganizerMarkup({ map, organizer: o }) {
    const popupNode = useMemo(() => document.createElement("div"), []);
    const colors = getColors();

    useEffect(() => {
        const marker = new maplibregl.Marker({
            color:
              o.type === "venue" ? colors.markers.venue.dark : colors.markers.festival.dark,
          })
            .setLngLat([o.longitude, o.latitude])
            .setPopup(new maplibregl.Popup().setDOMContent(popupNode))
            .addTo(map);

            return () => marker.remove();
    }, [map, o, popupNode])

    return createPortal(<OrganizerPopup o={o}/>, popupNode);
}