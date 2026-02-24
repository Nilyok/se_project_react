import React from "react";
import useModalClose from "../../hooks/useModalClose";
import "../ModalWithForm/ModalWithForm.css";

const Modal = ({
  isOpen,
  name,
  onClose,
  children,
  closeIcon
}) => {
  useModalClose(isOpen, onClose);

  if (!isOpen) return null;

  return (
        <div
      className={`modal modal_type_${name} ${
        isOpen ? "modal_is-opened" : ""
      }`}
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
          <img
            src={closeIcon}
            alt="Close"
            className="modal__close-icon"
          />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
