import { useState, useEffect } from "react";
import { getOrganizers } from "../api/organizers";

export default function useOrganizers() {
    const [organizers, setOrganizers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getOrganizers()
        .then(setOrganizers)
        .catch(setError)
        .finally(() => setLoading(false))
    }, [])

    return { organizers, loading, error }
}