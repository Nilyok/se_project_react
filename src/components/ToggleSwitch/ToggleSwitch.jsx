import React from "react";
import "./ToggleSwitch.css";
import toggleF from "../../images/ToggleSwitch-Farenheit.svg";
import toggleHover from "../../images/ToggleSwitch-Hover.svg";
import toggleMove from "../../images/ToggleSwitch-Move.svg";
import toggleC from "../../images/ToggleSwitch-Celsius.svg";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const context = React.useContext(CurrentTemperatureUnitContext);
  const currentTemperatureUnit = context?.currentTemperatureUnit || "F";
  const handleToggleSwitchChange =
    context?.handleToggleSwitchChange || (() => {});

  const [isHovered, setIsHovered] = React.useState(false);
  const [isMoving, setIsMoving] = React.useState(false);
  const [imagesLoaded, setImagesLoaded] = React.useState(false);

  /* -------------------
    Preload all images
  ------------------- */
  React.useEffect(() => {
    const imageUrls = [toggleF, toggleHover, toggleMove, toggleC];
    const imagePromises = imageUrls.map((src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => setImagesLoaded(true))
      .catch((err) => console.error("Failed to load images:", err));
  }, []);

  /* -------------------
    Default image
  ------------------- */
  const [currentImage, setCurrentImage] = React.useState(
    currentTemperatureUnit === "C" ? toggleC : toggleF,
  );

  /* -------------------
    Update image when interaction
  ------------------- */
  React.useEffect(() => {
    if (!imagesLoaded) return;

    if (isMoving) {
      setCurrentImage(toggleMove);
    } else if (isHovered) {
      setCurrentImage(toggleHover);
    } else if (currentTemperatureUnit === "C") {
      setCurrentImage(toggleC);
    } else {
      setCurrentImage(toggleF);
    }
  }, [isHovered, isMoving, currentTemperatureUnit, imagesLoaded]);

  const handleClick = () => {
    handleToggleSwitchChange();
    setIsMoving(true);
    setTimeout(() => setIsMoving(false), 250);
  };

  if (!imagesLoaded) {
    return (
      <div className="toggle toggle--loading">
        <div className="toggle__placeholder"></div>
      </div>
    );
  }

  return (
    <div
      className={`toggle ${isMoving ? "toggle--move" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <img
        src={currentImage}
        alt={`Temperature toggle (${currentTemperatureUnit})`}
        className="toggle__image"
        onError={(e) => {
          e.target.src = toggleF;
        }}
      />
    </div>
  );
}

export default ToggleSwitch;
