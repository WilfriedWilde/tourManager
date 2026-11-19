import { useState, useEffect } from "react";
import { getTours } from "../api/tours";

export default function useTours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTours()
      .then(setTours)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  function addTour(tour) {
    setTours((prev) => [...prev, tour]);
  }

  function deleteTour(deletediID) {
    setTours((prev) => prev.filter((t) => t.id !== deletediID));
  }

  function updateTour(updated) {
    setTours((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  }

  return { tours, loading, error, addTour, deleteTour, updateTour };
}
