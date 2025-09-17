import { useEffect } from "react";
import "./ItemModal.css";
import closeIcon from "../../images/Preview-Close.svg"; 

function ItemModal({ isOpen, onClose, card }) {
  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;

    function handleEsc(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Close on overlay click
  function handleOverlayClick(e) {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  }

  if (!card) return null; // if no card is selected, render nothing

  return (
    <div
      className={`modal modal_type_preview ${isOpen ? "modal_is-opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content modal__content_type_preview">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
        >
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>

        <img
          src={card.link}
          alt={card.name}
          className="modal__image"
        />

        <div className="modal__caption">
          <p className="modal__title">{card.name}</p>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
