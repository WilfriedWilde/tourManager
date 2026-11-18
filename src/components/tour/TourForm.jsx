import { useState } from "react";
import { toStringDate } from "../../utils/format";
import { createTour } from "../../api/tours";
import InputTourForm from "./InputTourForm";
import IconConfirm from "../../assets/icons/confirm.svg?react";
import IconCancel from "../../assets/icons/cancel.svg?react";
import "./tour.css";

const MIN_NAME = 2;
const MAX_NAME = 50;

export default function TourForm({ show, onDone, onCancel }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectName, setProjectName] = useState("");
  const [tourName, setTourName] = useState("");
  const [error, setError] = useState(null);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = toStringDate(tomorrow);
  const numDays = getNumDays(startDate, endDate);

  function resetStates() {
    setProjectName("");
    setTourName("");
    setStartDate("");
    setEndDate("");
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

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const tour = await createTour({
        project_name: projectName,
        tour_name: tourName,
        start: startDate,
        end: endDate,
      });

      resetStates();
      onDone(tour);
    } catch (err) {
      setError(err);
    }
  }

  function handleCancel(e) {
    e.preventDefault();
    setError(null);
    resetStates();
    onCancel();
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
        <div className="tour-form-btns-container">
          <button
            type="submit"
            onClick={handleSubmit}
            className="icon-container-confirm"
          >
            <IconConfirm />
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="icon-container-cancel"
          >
            <IconCancel />
          </button>
          <p className={`form-error ${error ? "show" : ""}`}>
            {error?.errors?.map((err) => (
              <span key={err.field}>
                {err.field} {err.message}
              </span>
            ))}
          </p>
        </div>
      </form>
    </>
  );
}

function getNumDays(start, end) {
  if (!start || !end) return null;

  const startDate = new Date(start).getTime();
  const endDate = new Date(end).getTime();

  return Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
}
