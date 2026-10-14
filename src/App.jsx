import useOrganizers from "./hooks/useOrganizers";
import Map from "./components/map/Map";
import Login from "./components/login/Login";
import "./index.css"
import LoginForm from "./components/loginForm/LoginForm";

function App() {
    // TODO: implement login first
    
/*
    const {organizers, loadingOrganizers, errorOrganizers} = useOrganizers();

    if (loadingOrganizers) return <p>Loading organizers...</p>;
    if (errorOrganizers) return <p>Something went wrong while loading organizers :(</p>;
*/
    return (
        <LoginForm />
     //   <Map organizers={organizers} />
    );
}

export default App;