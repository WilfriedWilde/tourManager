import { useAuth } from "../components/AuthContext";
import Map from "../components/map/Map";
import Navbar from "../components/navbar/Navbar";
import useOrganizers from "../hooks/useOrganizers";

export default function Home() {
    const { user } = useAuth();
    const { organizers, loading, error } = useOrganizers();
    if (loading) return <p>loading organizers...</p>
    if (error) return <p>error loading organizers</p>

    return (
        <>
            <Navbar />
            <h1>Tour wise</h1>
            {user && <p>Welcome {user.username}</p>}
            <Map organizers={organizers}/>
        </>
    )
}