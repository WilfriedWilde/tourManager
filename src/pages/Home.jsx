import Map from "../components/map/Map";
import Navbar from "../components/navbar/Navbar";
import useOrganizers from "../hooks/useOrganizers";

export default function Home() {
    const { organizers, loading, error } = useOrganizers();
    if (loading) return <p>loading organizers...</p>
    if (error) return <p>error loading organizers</p>

    return (
        <>
            <Navbar />
            <h1>Tour wise</h1>
            <Map organizers={organizers}/>
        </>
    )
}