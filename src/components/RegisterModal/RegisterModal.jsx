import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose, onRegister }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatar, email, password });
  };

  return (
    <ModalWithForm
      title="Sign Up"
      name="register"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
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

      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </ModalWithForm>
  );
}

export default RegisterModal;
