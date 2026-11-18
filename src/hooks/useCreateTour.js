import { useState, useEffect } from "react";
import { postTour } from "../api/tours";

export default function useCreateTour(data) {
  const [tour, setTour] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    postTour(data)
      .then(setTour)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { tour, loading, error };
}
