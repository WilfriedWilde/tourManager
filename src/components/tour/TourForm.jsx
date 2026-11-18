import { useState } from "react";
import { formatDate, toStringDate } from "../../utils/format";
import InputTourForm from "./InputTourForm";
import "./tour.css";

const MIN_NAME = 2;
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

  function handleChangeProjectName(newProjectName) {
    setProjectName(newProjectName);
  }

  function handleChangeTourName(newTourName) {
    setTourName(newTourName);
  }

  function handleChangeStart(newStart) {
    setStartDate(newStart);
  }

  function handleChangeEnd(newEnd) {
    setEndDate(newEnd);
  }

  return (
    <>
      <form className={`tour-form ${show ? "show-tour-form" : ""}`}>
        <h2>new tour</h2>
        <div className="form-content">
          <div className="tour-form-row">
            <h3>name</h3>
            <div className="row-content">
              <InputTourForm
                inputType="text"
                label="project"
                value={projectName}
                handleOnChange={handleChangeProjectName}
                min={`${MIN_NAME}`}
                max={`${MAX_NAME}`}
              />
              <InputTourForm
                inputType="text"
                label="tour"
                value={tourName}
                handleOnChange={handleChangeTourName}
                min={`${MIN_NAME}`}
                max={`${MAX_NAME}`}
              />
            </div>
          </div>
          <div className="tour-form-row">
            <h3>date</h3>
            <div className="row-content">
              <InputTourForm
                inputType="date"
                label="start"
                value={startDate}
                handleOnChange={handleChangeStart}
                min={minDate}
                max={endDate}
              />
              <InputTourForm
                inputType="date"
                label="end"
                value={endDate}
                handleOnChange={handleChangeEnd}
                min={startDate || minDate}
                max=""
              />
            </div>

            <p className="days">
              <span>{numDays ? `${numDays}` : 0} </span>
              {numDays && numDays > 1 ? "days" : "day"}
            </p>
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
