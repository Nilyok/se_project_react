import "./ItemModal.css";
import closeIcon from "../../images/Preview-Close.svg";
import notFoundImage from "../../images/Image-NotFound.svg";
import Modal from "../Modal/Modal";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";


function ItemModal({ isOpen, onClose, card, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  if (!card) return null;
  const isOwn = card?.owner === currentUser?._id;

  return (
    <Modal
      isOpen={isOpen}
      name="preview"
      onClose={onClose}
      closeIcon={closeIcon}
      closeAlt="Close"
    >
      <img
        src={card.imageUrl}
        alt={card.name}
        className="modal__image"
        onError={(e) => (e.target.src = notFoundImage)}
      />

      <div className="modal__caption-row">
        <p className="modal__title">{card.name}</p>
        <button
          type="button"
          className="modal__delete"
          onClick={onDelete}
        >
          Delete item
        </button>
      </div>

      <p className="modal__weather">Weather: {card.weather}</p>
    </Modal>
  );
}

export default ItemModal;
