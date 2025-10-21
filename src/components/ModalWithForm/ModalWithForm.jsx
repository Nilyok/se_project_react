import useModalClose from "../../hooks/useModalClose";
import Modal from "../Modal/Modal";
import "./ModalWithForm.css"; // Make sure this import is correct
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
  useModalClose(isOpen, onClose);

  return (
    <Modal isOpen={isOpen} name={name} onClose={onClose} closeIcon={closeIcon} closeAlt={"Close"}>
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
          <button type="submit" className="modal__submit" disabled={isSubmitDisabled}>
            {buttonText}
          </button>
        )}
      </form>
    </Modal>
  );
}

export default ModalWithForm;