import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import useTours from "../../hooks/useTours";
import Tour from "../../components/tour/Tour";
import TourForm from "../../components/tour/TourForm";
import TourBorder from "../../assets/icons/tour-border.svg?react";
import IconAdd from "../../assets/icons/add.svg?react";

export default function HomeLogged() {
  const { tours, loading, error } = useTours();
  const [hovered, setHovered] = useState(false);
  const [showTourForm, setShowTourForm] = useState(false);

  return (
    <>
      <Navbar />
      <main className="home-main home-logged">
        <div className="tours">
          <div className="header">
            <p>timeframe</p>
            <p>name</p>
            <p>status</p>
          </div>
          {loading ? (
            <p className="loading-tours">loading tours</p>
          ) : error ? (
            <div className="error-tours">
              <p>{error.code}</p>
              <p>{error.message}</p>
            </div>
          ) : (
            tours.map((t) => <Tour key={`tour-${t.id}`} data={t} />)
          )}
          <div className={`add-tour ${hovered ? "add-tour-hovered" : ""}`}>
            <div className="add-icon-container">
              <IconAdd
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => setShowTourForm(true)}
              />
            </div>
            <TourBorder
              className={`tour-border ${hovered ? "tour-border-hovered" : ""}`}
            />
          </div>
        </div>
      </main>
      <TourForm
        show={showTourForm}
        onDone={() => setShowTourForm(false)}
        onCancel={() => setShowTourForm(false)}
      />
      <div id="overlay" className={showTourForm ? "show-overlay" : ""}></div>
    </>
  );
}
