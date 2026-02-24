import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose, onRegister, onSwitch }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isFormValid =
    name.trim() &&
    avatar.trim() &&
    email.trim() &&
    password.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // clear previous error
    
    onRegister({ name, avatar, email, password })
      .catch(() => {
        setError("Registration failed. Please try again.");
      });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      name="register"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isFormValid}
      onSwitch={onSwitch}
    >
      <label className="modal__label">
        Email*
        <input
          type="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label className="modal__label">
        Password*
        <input
          type="password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <label className="modal__label">
        Name*
        <input
          type="text"
          name="name"
          minLength="2"
          maxLength="30"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label className="modal__label">
        Avatar URL*
        <input
          type="url"
          name="avatar"
          required
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        {error && (
          <p className="modal__error">
            {error}
          </p>
        )}
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;