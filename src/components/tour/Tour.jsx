import { useState } from "react";
import { formatDate } from "../../utils/format";
import IconEdit from "../../assets/icons/edit.svg?react";
import IconDelete from "../../assets/icons/delete.svg?react";
import "./tour.css";
import EditTourForm from "./EditTourForm";

export default function Tour({
  data,
  showEditForm,
  onEdit,
  onCloseEdit,
  onDelete,
  onUpdate,
}) {
  const {
    id,
    tour_name: tourName,
    project_name: projectName,
    start,
    end,
    stops,
    contacts,
    confirmed_gigs: gigsConfirmed,
  } = data;

  const gigs = stops.filter((s) => s.type === "gig");
  const status = gigs.length
    ? gigsConfirmed === gigs.length
      ? "booked"
      : "pending"
    : "unplanned";

  return (
    <div className="tour">
      <div className="tour-col">
        <p className="up">{`${formatDate(start)} - ${formatDate(end)}`}</p>
        <p className="days">
          <span>{`${stops.length}`} </span>
          {`${stops.length > 1 ? "days" : "day"}`}
        </p>
      </div>
      <div className="tour-col">
        <p className="up">{projectName}</p>
        <p className="down">{tourName}</p>
      </div>
      <div className="tour-col">
        <div className="status-container up">
          <div className={`status ${status}`}></div>
          <p>{status}</p>
        </div>
        <p className="down">{`${gigsConfirmed}/${gigs.length} ${
          gigs.length > 1 ? "gigs" : "gig"
        } confirmed`}</p>
      </div>
      <div className="update-tour-btns-container">
        <div className="update-icon-container">
          <IconEdit onClick={onEdit} />
        </div>
        <div className="update-icon-container">
          <IconDelete onClick={() => onDelete(id)} />
        </div>
      </div>
      <EditTourForm
        tour={{ id, projectName, tourName, start, end }}
        show={showEditForm}
        onDone={(updated) => {
          onUpdate(updated);
          onCloseEdit();
        }}
        onCancel={onCloseEdit}
      />
    </div>
  );
}
