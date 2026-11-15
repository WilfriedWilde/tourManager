import { useState } from "react";
import { useAuth } from "../../components/AuthContext";
import LogoBanner from "../../assets/logos/logo_banner.svg?react";
import HomeLogged from "./HomeLogged";
import HomeMap from "../../components/map/HomeMap";
import AuthForm from "../../components/authForm/AuthForm";
import Loader from "../../components/loader/Loader";
import "./home.css";

export default function Home() {
  const { user } = useAuth();
  const [mode, setMode] = useState("");
  const [mapLoaded, setMapLoaded] = useState(false);

  function handleSelectMode(btn, mode) {
    btn.classList.contains("selected") ? setMode("") : setMode(mode);
  }

  return (
    <>
      {user ? (
        <HomeLogged />
      ) : (
        <main className="home-main">
          <Loader loaded={mapLoaded} />
          <div className="home-section" id="logo-container">
            <LogoBanner className="logo-banner" />
          </div>
          <HomeMap setLoaded={setMapLoaded} />
          <div className="home-section" id="slogan-container">
            <p>Book more tours.</p>
            <p>Play more gigs.</p>
            <p>Stay broke.</p>
          </div>
          <div className="home-section" id="btn-container" data-mode={mode}>
            <button
              id="btn-login"
              type="button"
              className={`btn-home ${mode === "login" ? "selected" : ""}`}
              onClick={(e) => handleSelectMode(e.target, "login")}
            >
              login
            </button>
            <button
              id="btn-register"
              type="button"
              className={`btn-home ${mode === "register" ? "selected" : ""}`}
              onClick={(e) => handleSelectMode(e.target, "register")}
            >
              register
            </button>
            <div id="btn-selector" className="btn-home"></div>
          </div>
          <AuthForm formType="login" selected={mode === "login"} />
          <AuthForm formType="register" selected={mode === "register"} />
        </main>
      )}
    </>
  );
}
