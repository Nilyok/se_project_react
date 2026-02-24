import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./EditProfilePopup.css";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, avatar });
  }

    return (
      <ModalWithForm
        title="Change profile data"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        buttonText={isLoading ? "Saving..." : "Save changes"}
        isLoading={isLoading}
        name="edit-profile"  
      >
      <label className="modal__label">
        Name *
        <input
          type="text"
          name="name"
          placeholder="Name"
          minLength="2"
          maxLength="30"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="modal__input"
        />
      </label>

      <label className="modal__label">
        Avatar *
        <input
          type="url"
          name="avatar"
          placeholder="Avatar URL"
          required
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="modal__input"
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfilePopup;
