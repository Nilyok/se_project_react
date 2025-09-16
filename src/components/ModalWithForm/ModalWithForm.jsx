import "./ModalWithForm.css";
import { useEffect } from "react";


function ModalWithForm({ title, name, buttonText, children, isOpen, onClose }) {
  // Close modal on ESC
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

  return (
    <div
      className={`modal modal_type_${name} ${
        isOpen ? "modal_is-opened" : ""
      }`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
        >
            
        </button>

        <h3 className="modal__title">{title}</h3>

        <form className="modal__form" name={name}>
          {children}

          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
