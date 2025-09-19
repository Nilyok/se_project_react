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

  /* -------------------
     Fetch Weather on Mount
  ------------------- */
  useEffect(() => {
    getWeather()
      .then((data) => setWeatherData(data))
      .catch((err) => console.error(err));
  }, []);

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

  function handleAddItem(newItem) {
    const itemWithLink = {
      _id: crypto.randomUUID(),
      name: newItem.name,
      link: newItem.imageUrl,
      weather: newItem.weather,
    };

    setClothingItems((prev) => [itemWithLink, ...prev]);
    setActiveModal("");
  }

  /* -------------------
     Render
  ------------------- */
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

      <ModalWithForm
        isOpen={activeModal === "addClothes"}
        onClose={handleCloseModal}
        title="New garment"
        buttonText="Add garment"
        onAddItem={handleAddItem}
      />

      <ItemModal
        isOpen={activeModal === "preview"}
        onClose={handleCloseModal}
        card={selectedCard}
      />
    </>
  );
}

export default App;
