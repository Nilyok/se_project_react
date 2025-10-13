import "./DeleteConfirmationModal.css";
import closeIcon from "../../images/Delete-Button-Close.svg";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className={`modal modal_type_delete ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="modal__overlay" onClick={onClose}></div>

      <div
        className="modal__content modal__content_type_delete"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="modal__close modal__close_type_delete"
          onClick={onClose}
          aria-label="Close modal"
        >
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>

        {/* Text */}
        <div className="modal__text-group">
          <p className="modal__text-title">
            Are you sure you want to delete this item?
          </p>
          <p className="modal__text-sub">
            This action is irreversible.
          </p>
        </div>

        {/* Buttons */}
        <div className="modal__buttons">
          <button className="modal__confirm-btn" onClick={onConfirm}>
            Yes, delete item
          </button>
          <button className="modal__cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
