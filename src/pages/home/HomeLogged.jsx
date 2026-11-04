import Navbar from "../../components/navbar/Navbar";

export default function HomeLogged() {
  const { organizers, loading, error } = useOrganizers();
  if (loading) return <p>loading organizers...</p>;
  if (error) return <p>error loading organizers</p>;

  return (
    <>
      <Navbar />
      <Map organizers={organizers} />
    </>
  );
}
