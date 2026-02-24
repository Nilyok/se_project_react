import useModalClose from "../../hooks/useModalClose";
import Modal from "../Modal/Modal";
import "./ModalWithForm.css";
import closeIcon from "../../images/Button-Close.svg";

function ModalWithForm({
  title,
  name,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  children,
  isSubmitDisabled = false,
  onSwitch
}) {
  /* -------------------
     Close on ESC
  ------------------- */
  useModalClose(isOpen, onClose);

  return (
    <Modal
      isOpen={isOpen}
      name={name}
      onClose={onClose}
      closeIcon={closeIcon}
      closeAlt={"Close"}
    >
      <div className="modal__title-row">
        <h2 className="modal__title">{title}</h2>

        {name === "preview" && (
          <button
            type="button"
            className="modal__delete"
            onClick={onSwitch}
          >
            Delete item
          </button>
        )}
      </div>

      <form className="modal__form" name={name} onSubmit={onSubmit}>
        {children}

        {buttonText && (
          <div className="modal__actions">
            <button
              type="submit"
              className="modal__submit"
              disabled={isSubmitDisabled}
            >
              {buttonText}
            </button>

            {/* Only show for Register modal */}
            {onSwitch && name !== "preview" && (
              <button
                type="button"
                className="modal__switch"
                onClick={onSwitch}
              >
                {name === "register" ? "or Log In" : "or Sign Up"}
              </button>
            )}
          </div>
        )}
      </form>
    </Modal>
  );
}

export default ModalWithForm;