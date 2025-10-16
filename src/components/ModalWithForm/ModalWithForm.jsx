import { useEffect } from "react";
import "./ModalWithForm.css";
import closeIcon from "../../images/Button-Close.svg";

function ModalWithForm({
  isOpen,
  onClose,
  name,
  title,
  buttonText,
  onSubmit,
  children,
  isSubmitDisabled,
  onDelete,
}) {
  /* -------------------
     Close on ESC
  ------------------- */
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  /* -------------------
     Render
  ------------------- */
  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_is-opened" : ""}`}
    >
      <div className="modal__overlay" onClick={onClose}></div>

      <div
        className={`modal__content modal__content_type_${name}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>

        {/* -------------------
            Title + Delete Link Row
        ------------------- */}
        <div className="modal__title-row">
          <h2 className="modal__title">{title}</h2>

          {name === "preview" && (
            <button type="button" className="modal__delete" onClick={onDelete}>
              Delete item
            </button>
          )}
        </div>

        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}
          {buttonText && (
            <button
              type="submit"
              className="modal__submit"
              disabled={isSubmitDisabled}
            >
              {buttonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
