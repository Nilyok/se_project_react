import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getWeather } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { defaultClothingItems } from "../../utils/clothingItems";
import AddItemModal from "../AddItemModal/AddItemModal";

/* -------------------
     App Component
------------------- */
function App() {
  /* -------------------
     State Management
  ------------------- */
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [isHeaderPopupOpen, setIsHeaderPopupOpen] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  /* -------------------
     Fetch Weather on Mount
  ------------------- */
  useEffect(() => {
    getWeather()
      .then((data) => setWeatherData(data))
      .catch((err) => console.error(err));
  }, []);

  /* -------------------
     Temperature Unit Context State
  ------------------- */
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
    console.log(
      "Temperature unit switched to:",
      currentTemperatureUnit === "F" ? "C" : "F"
    );
  };

  /* -------------------
     Add Item Modal Handler
  ------------------- */
  function handleAddItemSubmit(item, resetForm) {
    const newItem = {
      _id: crypto.randomUUID(),
      name: item.name,
      link: item.imageUrl,
      weather: item.weather,
    };

    setClothingItems((prev) => [newItem, ...prev]);
    resetForm();
    handleCloseModal();
  }

  /* -------------------
     Modal & Popup Handlers
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
    if (!activeModal) return;

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
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{
        currentTemperatureUnit,
        handleToggleSwitchChange,
      }}
    >
      <BrowserRouter basename="/se_project_react">
        <div className="page">
          {/* -------------------
              Header
          ------------------- */}
          <Header
            location={weatherData ? weatherData.city : "Loading..."}
            onAddClothesClick={handleAddClothesClick}
            isPopupOpen={isHeaderPopupOpen}
            onClosePopup={() => setIsHeaderPopupOpen(false)}
            onOpenPopup={() => setIsHeaderPopupOpen(true)}
          />

          {/* -------------------
              Routes
          ------------------- */}
          <Routes>
            <Route
              path="/"
              element={
                weatherData && (
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                  />
                )
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onAddClothesClick={handleAddClothesClick}
                />
              }
            />
          </Routes>

          {/* -------------------
              Footer
          ------------------- */}
          <Footer />

          {/* -------------------
              Add Clothes Modal
          ------------------- */}
          <AddItemModal
            isOpen={activeModal === "addClothes"}
            onAddItem={handleAddItemSubmit}
            onCloseModal={handleCloseModal}
          />

          {/* -------------------
              Preview Item Modal
          ------------------- */}
          <ItemModal
            isOpen={activeModal === "preview"}
            onClose={handleCloseModal}
            card={selectedCard}
          />
        </div>
      </BrowserRouter>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
