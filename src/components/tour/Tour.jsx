import "./tour.css";

export default function Tour({ data }) {
  const {
    tour_name: tourName,
    project_name: projectName,
    start,
    end,
    contacts,
  } = data;

  return (
    <div className="tour">
      <p className="tour-timeframe">{`${start} - ${end}`}</p>
      <div className="tour-names-container">
        <p>{projectName}</p>
        <p>{tourName}</p>
      </div>
      <div className="tour-status">{getStatus(contacts)}</div>
    </div>
  );
}
