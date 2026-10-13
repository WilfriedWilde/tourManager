import useOrganizers from "./hooks/useOrganizers";
import Map from "./components/map/Map";

function App() {
    const {organizers, loadingOrganizers, errorOrganizers} = useOrganizers();

    if (loadingOrganizers) return <p>Loading organizers...</p>;
    if (errorOrganizers) return <p>Something went wrong while loading organizers :(</p>;

    return (
        <Map organizers={organizers} />
    );
}

export default App;