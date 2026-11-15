import { useState } from "react";
import LogoLoader from "../../assets/logos/logo_alone.svg?react";
import "./loader.css";

export default function Loader({ loaded }) {
  const [hidden, setHidden] = useState(false);

  return (
    <div
      className={`loader ${loaded ? "hide" : ""}`}
      onAnimationEnd={(e) => {
        if (e.target === e.currentTarget && loaded) setHidden(true);
      }}
    >
      <LogoLoader className={`logo-loader ${hidden ? "stop" : ""}`} />
    </div>
  );
}
