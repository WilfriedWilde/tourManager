import Navbar from "../../components/navbar/Navbar";
import useTours from "../../hooks/useTours";

export default function HomeLogged() {
  const { tours, loading, error } = useTours();

  return (
    <>
      <Navbar />
      <main className="home-main">
        <div className="tours">
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
