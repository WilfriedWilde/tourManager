import { useAuth } from "../AuthContext";
import { logout } from "../../api/users";
import ButtonNavbar from "./ButtonNavbar";
import IconProfile from "../../assets/icons/profile.svg?react";
import LogoBanner from "../../assets/logos/logo_banner.svg?react";
import IconLogout from "../../assets/icons/logout.svg?react";
import "./navbar.css";

export default function Navbar() {
  const { user, setUser } = useAuth();

  function handleProfile() {
    console.log(`hello ${user.username}!`);
  }

  async function handleLogout() {
    try {
      await logout();
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <nav id="navbar">
      <ButtonNavbar
        label="profile"
        icon={IconProfile}
        handleClick={handleProfile}
      />
      <div className="navbar-icon-container">
        <LogoBanner className="logo-banner" />
      </div>
      <ButtonNavbar
        label="logout"
        icon={IconLogout}
        handleClick={handleLogout}
      />
    </nav>
  );
}
