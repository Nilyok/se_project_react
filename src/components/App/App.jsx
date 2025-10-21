import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { getWeather } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { getItems, addItem, deleteItem } from "../../utils/api";

/* -------------------
   AppHeader Component 
------------------- */
function AppHeader({
  weatherData,
  onAddClothesClick,
  isHeaderPopupOpen,
  setIsHeaderPopupOpen,
}) {
  const location = useLocation();
  const variant = location.pathname === "/profile" ? "profile" : "default";

  return (
    <Header
      location={weatherData ? weatherData.city : "Loading..."}
      onAddClothesClick={onAddClothesClick}
      isPopupOpen={isHeaderPopupOpen}
      onClosePopup={() => setIsHeaderPopupOpen(false)}
      onOpenPopup={() => setIsHeaderPopupOpen(true)}
      variant={variant}
    />
  );
}

/* -------------------
   Main App Component
------------------- */
function AppContent() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [isHeaderPopupOpen, setIsHeaderPopupOpen] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /* -------------------
     Fetch Weather + Items on Mount
  ------------------- */
  useEffect(() => {
    getWeather()
      .then((data) => setWeatherData(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => setClothingItems(items))
      .catch((err) => console.error("Error loading items:", err));
  }, []);

  /* -------------------
     Toggle °F/°C
  ------------------- */
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  /* -------------------
     Add New Item 
  ------------------- */
  function handleAddItemSubmit(item, resetForm) {
    const newItem = {
      name: item.name,
      imageUrl: item.imageUrl,
      weather: item.weather,
    };

    setIsLoading(true);
    addItem(newItem)
      .then((savedItem) => {
        setClothingItems((prev) => [savedItem, ...prev]);
        resetForm();
        handleCloseModal();
      })
      .catch((err) => console.error("Add item error:", err))
      .finally(() => setIsLoading(false));
  }

  /* -------------------
   Open Delete Confirmation
  ------------------- */
  function openDeleteConfirmation(card) {
    setCardToDelete(card);
    setActiveModal("confirmDelete");
  }

  /* -------------------
     Delete Confirmation
  ------------------- */
  function handleCardDelete() {
    if (!cardToDelete) return;
  const id = cardToDelete.id;
    setIsLoading(true);
    deleteItem(id)
      .then(() => {
  setClothingItems((prev) => prev.filter((item) => item.id !== id));
        setCardToDelete(null);
        handleCloseModal();
      })
      .catch((err) => console.error("Delete item error:", err))
      .finally(() => setIsLoading(false));
  }


  /* -------------------
     Modal & Popup
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
     Escape Close
  ------------------- */
  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => e.key === "Escape" && handleCloseModal();
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
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
      <div className="page">
        <AppHeader
          weatherData={weatherData}
          onAddClothesClick={handleAddClothesClick}
          isHeaderPopupOpen={isHeaderPopupOpen}
          setIsHeaderPopupOpen={setIsHeaderPopupOpen}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherData={
                  weatherData || {
                    temperature: { F: 0, C: 0 },
                    city: "Loading...",
                    type: "warm",
                    condition: "",
                    timeOfDay: "Day",
                  }
                }
                clothingItems={clothingItems}
                onCardClick={handleCardClick}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                clothingItems={clothingItems}
                onAddClothesClick={handleAddClothesClick}
                onCardClick={handleCardClick}
                onDelete={openDeleteConfirmation}
              />
            }
          />
        </Routes>

        <Footer />

        <AddItemModal
          isOpen={activeModal === "addClothes"}
          onAddItem={handleAddItemSubmit}
          onCloseModal={handleCloseModal}
          isLoading={isLoading}
        />
        <ItemModal
          isOpen={activeModal === "preview"}
          onClose={handleCloseModal}
          card={selectedCard}
          onDelete={() => openDeleteConfirmation(selectedCard)}
        />
        <DeleteConfirmationModal
          isOpen={activeModal === "confirmDelete"}
          onClose={handleCloseModal}
          onConfirm={handleCardDelete}
          isLoading={isLoading}
          buttonText={isLoading ? "Deleting..." : undefined}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

/* -------------------
   Browser Wrapper
------------------- */
function App() {
  const rawBase = import.meta?.env?.BASE_URL;
  const basename = import.meta.env.DEV
    ? undefined
    : rawBase && rawBase !== "/"
    ? rawBase.replace(/\/$/, "")
    : undefined;

  return (
    <BrowserRouter basename={basename}>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
