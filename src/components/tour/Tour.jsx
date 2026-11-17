import { useState } from "react";
import { formatDate } from "../../utils/format";
import "./tour.css";

export default function Tour({ data }) {
  const {
    tour_name: tourName,
    project_name: projectName,
    start,
    end,
    stops,
    contacts,
  } = data;

  const gigs = stops.filter((s) => s.type === "gig");
  const confirmed = getConfirmed(contacts);
  const status = confirmed.length === gigs.length ? "booked" : "pending";

  return (
    <div className="tour">
      <div className="tour-col">
        <p className="up">{`${formatDate(start)} - ${formatDate(end)}`}</p>
        <p className="down">{`${stops.length} ${stops.length > 1 ? "days" : "day"}`}</p>
      </div>
      <div className="tour-col">
        <p className="up">{projectName}</p>
        <p className="down">{tourName}</p>
      </div>
      <div className="tour-col">
        <div className="status-container up">
          <div className={`status ${status}`}></div>
          <p>{status}</p>
        </div>
        <p className="down">{`${confirmed.length}/${gigs.length} ${gigs.length > 1 ? "gigs" : "gig"} confirmed`}</p>
      </div>
    </div>
  );
}

function getConfirmed(contacts) {
  const seen = new Set();

  return contacts.filter((c) => {
    if (c.status !== "confirmed" || seen.has(c.organizer_id)) {
      return false;
    }

    seen.add(c.organizer_id);
    return true;
  });
}
