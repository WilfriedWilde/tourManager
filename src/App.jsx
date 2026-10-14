import useOrganizers from "./hooks/useOrganizers";
import Map from "./components/map/Map";
import Login from "./components/login/Login";
import "./index.css"

function App() {
    // TODO: implement login first
    
/*
    const {organizers, loadingOrganizers, errorOrganizers} = useOrganizers();

    if (loadingOrganizers) return <p>Loading organizers...</p>;
    if (errorOrganizers) return <p>Something went wrong while loading organizers :(</p>;
*/
    return (
        <Login />
     //   <Map organizers={organizers} />
    );
}

export default App;