import { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

function LoginModal({ isOpen, onClose, onLogin, onSwitch, error }) {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  const isFormValid =
    values.email.trim() && values.password.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  return (
    <ModalWithForm
      title="Log In"
      name="login"
      buttonText="Log In"
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

      {error && <p className="modal__error">{error}</p>}
    </ModalWithForm>
  );
}

export default LoginModal;
