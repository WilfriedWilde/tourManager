import { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import * as maplibregl from "maplibre-gl";
import OrganizerPopup from "./organizerPopup/OrganizerPopup";
import { colors } from "../constants";

export default function OrganizerMarkup({ map, organizer: o }) {
    const popupNode = useMemo(() => document.createElement("div"), []);

    useEffect(() => {
        const marker = new maplibregl.Marker({
            color:
              o.type === "venue" ? colors.markers.venue : colors.markers.festival,
          })
            .setLngLat([o.longitude, o.latitude])
            .setPopup(new maplibregl.Popup().setDOMContent(popupNode))
            .addTo(map);

            return () => marker.remove();
    }, [map, o, popupNode])

    return createPortal(<OrganizerPopup o={o}/>, popupNode);
}