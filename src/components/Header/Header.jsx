import "./Header.css";
import logo from "../../images/Logo-Header.svg";
import Avatar from "../../images/User-Avartar-Header.png"

function Header({ location, onAddClothesClick }) {
  // generate current date
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <img src={logo} 
        alt="WTWR logo" 
        className="header__logo" />
        <p className="header__date-location">
          {currentDate}, {location}
        </p>
      </div>

      <div className="header__right">
        <button
          type="button"
          className="header__add-btn"
          onClick={onAddClothesClick}
        >
          + Add clothes
        </button>
        <div className="header__user">
          <p className="header__username">Terrence Tegegne</p>
          <img
            src={Avatar} 
            alt="User Avatar" 
            className="header__avatar"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;