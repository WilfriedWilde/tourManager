import "./buttonHome.css";

export default function ButtonHome({ btnID, label, size, Icon }) {
  return (
    <button className={`button-home btn-${size}`}>
      <p htmlFor={btnID} className={`label-btn-home label-${size}`}>
        {label}
      </p>
      <div className={`icon-container icon-${size}`}>
        <Icon />
      </div>
    </button>
  );
}
