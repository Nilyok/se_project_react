import "./App.css";
import { useState, useEffect } from "react";
import { getWeather } from "../../utils/weatherApi";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { defaultClothingItems } from "../../utils/clothingItems";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [isHeaderPopupOpen, setIsHeaderPopupOpen] = useState(false);

  //  Form state
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });
  const [errors, setErrors] = useState({});

  /* -------------------
     Fetch Weather on Mount
  ------------------- */
  useEffect(() => {
    getWeather()
      .then((data) => setWeatherData(data))
      .catch((err) => console.error(err));
  }, []);

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

    const newItem = {
      _id: crypto.randomUUID(),
      name: formData.name,
      link: formData.imageUrl,
      weather: formData.weather,
    };

    setClothingItems((prev) => [newItem, ...prev]);
    setFormData({ name: "", imageUrl: "", weather: "" });
    setErrors({});
    handleCloseModal();
  }

  /* -------------------
     Handlers
  ------------------- */
  function handleAddClothesClick() {
    setActiveModal("addClothes");
    setIsHeaderPopupOpen(false);
  }

  function handleCardClick(item) {
    setSelectedCard(item);
    setActiveModal("preview");
  }

  function handleCloseModal() {
    setActiveModal("");
    setSelectedCard(null);
  }

  /* -------------------
     Escape Key Listener
  ------------------- */
  useEffect(() => {
    if (!activeModal) return; // stop effect if no active modal

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  /* -------------------
     Render
  ------------------- */
  const isValid =
    formData.name.trim() !== "" &&
    formData.imageUrl.trim() !== "" &&
    !errors.imageUrl &&
    formData.weather.trim() !== "";

  return (
    <>
      <div className="header-container">
        <Header
          location={weatherData ? weatherData.city : "Loading..."}
          onAddClothesClick={handleAddClothesClick}
          isPopupOpen={isHeaderPopupOpen}
          onClosePopup={() => setIsHeaderPopupOpen(false)}
          onOpenPopup={() => setIsHeaderPopupOpen(true)}
        />
      </div>

      {weatherData && (
        <Main
          weatherData={weatherData}
          clothingItems={clothingItems}
          onCardClick={handleCardClick}
        />
      )}

      <Footer />

      {/* Modal for Add Clothes */}
      <ModalWithForm
        isOpen={activeModal === "addClothes"}
        onClose={handleCloseModal}
        name="form"
        title="New garment"
        buttonText="Add garment"
        onSubmit={handleSubmit}
      >
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
      </ModalWithForm>

      {/* Modal for Preview Item */}
      <ItemModal
        isOpen={activeModal === "preview"}
        onClose={handleCloseModal}
        card={selectedCard}
      />
    </>
  );
}

export default App;
