import Navbar from "../../components/navbar/Navbar";
import useTours from "../../hooks/useTours";
import Tour from "../../components/tour/Tour";

export default function HomeLogged() {
  const { tours, loading, error } = useTours();

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
        </div>
      </main>
    </>
  );
}
