import React, { useState, useEffect, useContext } from "react";
import "./Header.css";
import logo from "../../images/Logo-Header.png";
import avatar from "../../images/User-Avartar-Header.png";
import mobileBtn from "../../images/Mobile-Avatar-Button.svg";
import mobileClose from "../../images/Mobile-Close-Button.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  location,
  onAddClothesClick,
  isPopupOpen,
  onOpenPopup,
  onClosePopup,
  variant,
  onLoginClick,
  onRegisterClick,
}) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const headerClasses = [
    "header",
    variant === "profile" ? "header--profile" : "",
    isMobile && variant === "profile" ? "header--profile-mobile" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClasses}>
      {/* LEFT */}
      <div className="header__left">
        <Link to="/" className="header__logo-link">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </Link>
        <p className="header__date-location">
          {currentDate}, {location}
        </p>
      </div>

      {/* MOBILE BUTTON */}
      <button
        type="button"
        className="header__mobile-btn"
        onClick={onOpenPopup}
      >
        <img src={mobileBtn} className="header__mobile-icon" alt="Menu" />
      </button>

      {/* RIGHT SIDE */}
      <div className="header__right">
        <ToggleSwitch />

        {currentUser ? (
          <>
            <button
              type="button"
              className="header__add-btn"
              onClick={() => {
                onAddClothesClick();
                onClosePopup();
              }}
            >
              + Add Clothes
            </button>

            <div className="header__user">
              <Link to="/profile" className="header__username">
                {currentUser.name}
              </Link>
              <img
                src={currentUser.avatar || avatar}
                alt="User Avatar"
                className="header__avatar"
              />
            </div>
          </>
        ) : (
          <div className="header__auth-buttons">
            <button
              type="button"
              className="header__register-btn"
              onClick={onRegisterClick}
            >
              Signup
            </button>

            <button
              type="button"
              className="header__login-btn"
              onClick={onLoginClick}
            >
              Login
            </button>
          </div>
        )}
      </div>

      {/* MOBILE POPUP */}
      {isPopupOpen && (
        <div className="header__overlay" onClick={onClosePopup}>
          <div
            className="header__popup header__popup--open"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="header__popup-close"
              onClick={onClosePopup}
            >
              <img src={mobileClose} alt="Close" />
            </button>

            {currentUser ? (
              <>
                <div
                  className="header__popup-line"
                  onClick={() => {
                    onClosePopup();
                    navigate("/profile");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <p className="header__popup-username">{currentUser.name}</p>
                  <img
                    src={currentUser.avatar || avatar}
                    alt="User Avatar"
                    className="header__popup-avatar"
                  />
                </div>

                <button
                  type="button"
                  className="header__popup-add-btn"
                  onClick={() => {
                    onAddClothesClick();
                    onClosePopup();
                  }}
                >
                  + Add Clothes
                </button>

                {variant === "profile" && (
                  <div className="header__popup-temp">
                    <ToggleSwitch />
                  </div>
                )}
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="header__popup-add-btn"
                  onClick={() => {
                    onLoginClick();
                    onClosePopup();
                  }}
                >
                  Login
                </button>

                <button
                  type="button"
                  className="header__popup-add-btn"
                  onClick={() => {
                    onRegisterClick();
                    onClosePopup();
                  }}
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
