import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import useTours from "../../hooks/useTours";
import Tour from "../../components/tour/Tour";
import TourForm from "../../components/tour/TourForm";
import TourBorder from "../../assets/icons/tour-border.svg?react";
import IconAdd from "../../assets/icons/add.svg?react";

export default function HomeLogged() {
  const { tours, loading, error, addTour, deleteTour, updateTour } = useTours();
  const [hovered, setHovered] = useState(false);
  const [form, setForm] = useState(null);

  return (
    <>
      <Navbar />
      <main className="home-main home-logged">
        <div className="tours">
          <h2>my tours</h2>
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
            tours.map((t) => (
              <Tour
                key={`tour-${t.id}`}
                data={t}
                showForm={(type, id) => form?.type === type && form?.id === id}
                onOpenForm={(type) => setForm({ type: type, id: t.id })}
                onCloseForm={() => {
                  setForm(null);
                }}
                onDelete={deleteTour}
                onUpdate={updateTour}
              />
            ))
          )}
          <div className={`add-tour ${hovered ? "add-tour-hovered" : ""}`}>
            <div className="add-icon-container">
              <IconAdd
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => setForm({ type: "add" })}
              />
            </div>
            <TourBorder
              className={`tour-border ${hovered ? "tour-border-hovered" : ""}`}
            />
          </div>
        </div>
      </main>
      <TourForm
        show={form?.type === "add"}
        onDone={(tour) => {
          if (tour) addTour(tour);
          setForm(null);
        }}
        onCancel={() => setForm(null)}
      />
      <div
        id="overlay"
        className={form ? "show-overlay" : ""}
        onClick={() => {
          setForm(null);
        }}
      ></div>
    </>
  );
}
