import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

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
      title="Edit Profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Saving..." : "Save"}
      isLoading={isLoading}
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        minLength="2"
        maxLength="30"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="url"
        name="avatar"
        placeholder="Avatar URL"
        required
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
      />
    </ModalWithForm>
  );
}

export default EditProfilePopup;
