import { useState } from "react";
import { formatDate, toStringDate } from "../../utils/format";
import "./tour.css";

const MAX_NAME = 50;

export default function TourForm({ show, onDone }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectName, setProjectName] = useState("");
  const [tourName, setTourName] = useState("");

  const minDate = toStringDate(new Date());
  const numDays = getNumDays(startDate, endDate);

  function handleSubmit(e) {
    e.preventDefault();
    onDone();
  }

  return (
    <>
      <form className={`tour-form ${show ? "show-tour-form" : ""}`}>
        <h2>new tour</h2>
        <div className="form-content">
          <div className="tour-col">
            <input
              type="text"
              minLength="2"
              maxLength={`${MAX_NAME}`}
              placeholder="project name"
              name="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <input
              type="text"
              minLength="2"
              maxLength={`${MAX_NAME}`}
              placeholder="tour name"
              name="tourName"
              value={tourName}
              onChange={(e) => setTourName(e.target.value)}
            />
          </div>
          <div className="tour-col">
            <div className="form-date">
              <input
                type="date"
                min={minDate}
                max={endDate}
                name="startDate"
                placeholder="start"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                min={startDate || minDate}
                name="endDate"
                placeholder="end"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <p className="down">{numDays ? `${numDays} days` : ""}</p>
          </div>
        </div>
        <button onClick={handleSubmit}>create tour</button>
      </form>
    </>
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

function getNumDays(start, end) {
  if (!start || !end) return null;

  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();

  return Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
}
