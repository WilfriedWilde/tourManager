import { useState } from "react";
import { toStringDate } from "../../utils/format";
import { createTour, updateTour } from "../../api/tours";
import InputTourForm from "./InputTourForm";
import IconConfirm from "../../assets/icons/confirm.svg?react";
import IconCancel from "../../assets/icons/cancel.svg?react";
import { getNumDays } from "../../utils/days";

const MIN_NAME = 2;
const MAX_NAME = 50;

export default function EditTourForm({ tour, show, onDone, onCancel }) {
  const [projectName, setProjectName] = useState(tour.projectName);
  const [tourName, setTourName] = useState(tour.tourName);
  const [startDate, setStartDate] = useState(tour.start);
  const [endDate, setEndDate] = useState(tour.end);
  const [update, setUpdate] = useState({});
  const [error, setError] = useState(null);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = toStringDate(tomorrow);
  const numDays = getNumDays(startDate, endDate);

  function resetStates() {
    setProjectName(tour.projectName);
    setTourName(tour.tourName);
    setStartDate(tour.start);
    setEndDate(tour.end);
  }

  function handleChangeProjectName(newProjectName) {
    setProjectName(newProjectName);
    setUpdate((prev) => ({ ...prev, project_name: newProjectName }));
  }

  function handleChangeTourName(newTourName) {
    setTourName(newTourName);
    setUpdate((prev) => ({ ...prev, tour_name: newTourName }));
  }

  function handleChangeStart(newStart) {
    setStartDate(newStart);
    setUpdate((prev) => ({ ...prev, start: newStart, end: endDate }));
  }

  function handleChangeEnd(newEnd) {
    setEndDate(newEnd);
    setUpdate((prev) => ({ ...prev, end: newEnd, start: startDate }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const updated = await updateTour(tour.id, update);
      onDone(updated);
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
        <h2>edit tour</h2>
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
        </div>
        <p className={`form-error ${error ? "show" : ""}`}>{error?.message}</p>
      </form>
    </>
  );
}
