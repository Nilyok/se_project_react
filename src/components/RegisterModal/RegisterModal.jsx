import { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

function RegisterModal({ isOpen, onClose, onRegister, onSwitch }) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      resetForm();
      setError("");
    }
  }, [isOpen, resetForm]);

  const isFormValid =
    values.name.trim() &&
    values.avatar.trim() &&
    values.email.trim() &&
    values.password.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    onRegister(values).catch((err) => {
      setError(err?.message || "Registration failed. Please try again.");
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
          value={values.email}
          onChange={handleChange}
        />
      </label>

      <label className="modal__label">
        Password*
        <input
          type="password"
          name="password"
          required
          value={values.password}
          onChange={handleChange}
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
          value={values.name}
          onChange={handleChange}
        />
      </label>

      <label className="modal__label">
        Avatar URL*
        <input
          type="url"
          name="avatar"
          required
          value={values.avatar}
          onChange={handleChange}
        />
        {error && <p className="modal__error">{error}</p>}
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
