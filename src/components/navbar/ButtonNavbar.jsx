import "./navbar.css";

export default function ButtonNavbar({ label, icon: Icon, handleClick }) {
  return (
    <div className="btn-navbar" onClick={() => handleClick()}>
      <p>{label}</p>
      <div className="navbar-icon-container">
        <Icon />
      </div>
    </div>
  );
}
