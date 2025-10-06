import { useEffect } from "react";
import "./ItemModal.css";
import closeIcon from "../../images/Preview-Close.svg";

function ItemModal({ isOpen, onClose, card }) {
  /* -------------------
     Close on ESC + Overlay
  ------------------- */
  useEffect(() => {
    if (!isOpen) return; 

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleOverlay = (e) => {
      if (e.target.classList.contains("modal")) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOverlay);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlay);
    };
  }, [isOpen, onClose]);

  if (!card) return null;

  /* -------------------
     Render
  ------------------- */
  return (
    <div
      className={`modal modal_type_preview ${isOpen ? "modal_is-opened" : ""}`}
    >
      <div className="modal__content modal__content_type_preview">
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>

        <img src={card.link} alt={card.name} className="modal__image" />

        <div className="modal__caption">
          <p className="modal__title">{card.name}</p>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
