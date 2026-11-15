import Navbar from "../../components/navbar/Navbar";
import useOrganizers from "../../hooks/useOrganizers";
import MainMap from "../../components/map/MainMap";

export default function HomeLogged() {
  const { organizers, loading, error } = useOrganizers();
  if (loading) return <p>loading organizers...</p>;
  if (error) return <p>error loading organizers</p>;

  return (
    <>
      <Navbar />
      <MainMap organizers={organizers} />
    </>
  );
}
