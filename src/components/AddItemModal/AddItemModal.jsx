import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.name || !values.imageUrl || !values.weather) return;

    onAddItem(
      {
        name: values.name.trim(),
        imageUrl: values.imageUrl.trim(),
        weather: values.weather,
      },
      resetForm
    );
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onCloseModal}
      name="add-garment"
      title="New garment"
      buttonText="Add garment"
      onSubmit={handleSubmit}
      isSubmitDisabled={
        !values.name.trim() || !values.imageUrl.trim() || !values.weather.trim()
      }
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
          required
          autoComplete="off"
        />
      </label>

      <label className="modal__label">
        Image
        <input
          type="url"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl || ""}
          onChange={handleChange}
          required
          autoComplete="off"
        />
      </label>

      <fieldset className="modal__fieldset">
        <legend>Select the weather type:</legend>

        <label>
          <input
            type="radio"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          <span>Hot</span>
        </label>

        <label>
          <input
            type="radio"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          <span>Warm</span>
        </label>

        <label>
          <input
            type="radio"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
