import "./ModalWithForm.css";
import { useState } from "react";
import closeIcon from "../../images/Button-Close.svg";

function ModalWithForm({ isOpen, onClose, title, buttonText, onAddItem }) {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  /* -------------------
     Validation
  ------------------- */
  function validate(name, value) {
    let error = "";

    if (name === "imageUrl") {
      const pattern = /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i;
      if (!pattern.test(value)) {
        error = "This is not a valid image link";
      }
    }

    if (name === "name" && value.trim() === "") {
      error = "Name is required";
    }

    return error;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validate(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validate(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddItem(formData);
    setFormData({ name: "", imageUrl: "", weather: "" });
    setErrors({});
  }

  const isValid =
    formData.name.trim() !== "" &&
    formData.imageUrl.trim() !== "" &&
    !errors.imageUrl &&
    formData.weather.trim() !== "";

  /* -------------------
     Render
  ------------------- */
  return (
    <div className={`modal modal_type_form ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="modal__overlay" onClick={onClose}></div>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close modal">
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>

        <h2 className="modal__title">{title}</h2>

        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="modal__label">
            Name
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            {errors.name && <span className="modal__error">{errors.name}</span>}
          </label>

          <label className="modal__label">
            Image
            <input
              type="url"
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            {errors.imageUrl && (
              <span className="modal__error">{errors.imageUrl}</span>
            )}
          </label>

          <fieldset className="modal__fieldset">
            <legend>Select the weather type:</legend>
            <label>
              <input
                type="radio"
                name="weather"
                value="hot"
                checked={formData.weather === "hot"}
                onChange={handleChange}
              />
              <span>Hot</span>
            </label>
            <label>
              <input
                type="radio"
                name="weather"
                value="warm"
                checked={formData.weather === "warm"}
                onChange={handleChange}
              />
              <span>Warm</span>
            </label>
            <label>
              <input
                type="radio"
                name="weather"
                value="cold"
                checked={formData.weather === "cold"}
                onChange={handleChange}
              />
              <span>Cold</span>
            </label>
          </fieldset>

          <button type="submit" className="modal__submit" disabled={!isValid}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
