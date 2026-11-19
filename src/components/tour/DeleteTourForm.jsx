import { useState } from "react";
import { createTour, updateTour, deleteTour } from "../../api/tours";
import IconConfirm from "../../assets/icons/confirm.svg?react";
import IconCancel from "../../assets/icons/cancel.svg?react";

export default function DeleteTourForm({ tourID, show, onDone, onCancel }) {
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      await deleteTour(tourID);
      onDone(tourID);
    } catch (err) {
      setError(err);
    }
  }

  function handleCancel(e) {
    e.preventDefault();
    setError(null);
    onCancel();
  }

  return (
    <>
      <form className={`tour-form ${show ? "show-tour-form" : ""}`}>
        <p className="delete-title">Delete tour ?</p>
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
