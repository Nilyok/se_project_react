import "./Header.css";
import logo from "../../images/Logo-Header.svg";
import avatar from "../../images/User-Avartar-Header.png";
import mobileBtn from "../../images/Mobile-Avatar-Button.svg";
import mobileClose from "../../images/Mobile-Close-Button.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";


function Header({ location, onAddClothesClick, isPopupOpen, onOpenPopup, onClosePopup }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      {/* -------------------
          Left side (logo + date)
      ------------------- */}
      <div className="header__left">
        <Link to="/" className="header__logo-link">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </Link>
        <p className="header__date-location">
          {currentDate}, {location}
        </p>
      </div>


      {/* -------------------
          Mobile button
      ------------------- */}
      <button type="button" className="header__mobile-btn" onClick={onOpenPopup}>
        <img src={mobileBtn} alt="Menu" />
      </button>

      {/* -------------------
          Desktop right side
      ------------------- */}
      <div className="header__right">
        <ToggleSwitch />
        <button
          type="button"
          className="header__add-btn"
          onClick={() => {
            onAddClothesClick();
            onClosePopup();
          }}
        >
          + Add clothes
        </button>
        <div className="header__user">
          <Link to="/profile" className="header__username">
            Terrence Tegegne
          </Link>
          <img src={avatar} alt="User Avatar" className="header__avatar" />
        </div>

      </div>

      {/* -------------------
          Mobile popup
      ------------------- */}
      {isPopupOpen && (
        <div className="header__overlay" onClick={onClosePopup}>
          <div
            className="header__popup header__popup--open"
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="header__popup-close" onClick={onClosePopup}>
              <img src={mobileClose} alt="Close" />
            </button>
            <div className="header__popup-line">
              <p className="header__popup-username">Terrence Tegegne</p>
              <img src={avatar} alt="User Avatar" className="header__popup-avatar" />
            </div>
            <button
              type="button"
              className="header__popup-add-btn"
              onClick={() => {
                onAddClothesClick();
                onClosePopup();
              }}
            >
              + Add clothes
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
