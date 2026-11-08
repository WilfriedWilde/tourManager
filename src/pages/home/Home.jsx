import { useAuth } from "../../components/AuthContext";
import LogoBanner from "../../assets/logos/logo_banner.svg?react";
import HomeLogged from "./HomeLogged";
import "./home.css";
import HomeMap from "../../components/map/HomeMap";

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <HomeLogged />
      ) : (
        <main>
          <div className="home-section" id="logo-container">
            <LogoBanner className="logo-banner" />
          </div>
          <HomeMap />
          <div className="home-section" id="slogan-container">
            <p>Book more tours.</p>
            <p>Play more gigs.</p>
            <p>Stay broke.</p>
          </div>
          <div className="home-section" id="btn-container">
            <button id="btn-login" type="button" className="btn-home">
              login
            </button>
            <button id="btn-register" type="button" className="btn-home">
              register
            </button>
          </div>
        </main>
      )}
    </>
  );
}
