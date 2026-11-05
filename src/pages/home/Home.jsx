import { Link } from "react-router";
import { useAuth } from "../../components/AuthContext";
import LogoBanner from "../../assets/logos/logo_banner.svg?react";
import LoginIcon from "../../assets/icons/login.svg?react";
import HomeLogged from "./HomeLogged";
import ButtonHome from "../../components/buttonHome/ButtonHome";
import "./home.css";

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
          <div className="home-section" id="btn-container">
            <Link to="/login" className="link">
              <ButtonHome
                btnID="btn-login"
                label="login"
                size="big"
                Icon={LoginIcon}
              />
            </Link>
          </div>
        </main>
      )}
    </>
  );
}
