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
import { defaultClothingItems } from "../../utils/clothingItems";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

/* -------------------
   AppHeader Component (detects route variant)
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
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [isHeaderPopupOpen, setIsHeaderPopupOpen] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [cardToDelete, setCardToDelete] = useState(null);

  // Fetch Weather on Mount
  useEffect(() => {
    getWeather()
      .then((data) => setWeatherData(data))
      .catch((err) => console.error(err));
  }, []);

  // Toggle °F/°C
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  // Add New Item
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

  // Modal & Popup
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

  // Delete Confirmation
  function openDeleteConfirmation(card) {
    setCardToDelete(card);
    setActiveModal("confirmDelete");
  }

  function handleCardDelete() {
    setClothingItems((prev) =>
      prev.filter((item) => item._id !== cardToDelete._id)
    );
    setCardToDelete(null);
    handleCloseModal();
  }

  // Escape Close
  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => e.key === "Escape" && handleCloseModal();
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, [activeModal]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{
        currentTemperatureUnit,
        handleToggleSwitchChange,
      }}
    >
      <div className="page">
        {/* ✅ Smart Header (auto variant) */}
        <AppHeader
          weatherData={weatherData}
          onAddClothesClick={handleAddClothesClick}
          isHeaderPopupOpen={isHeaderPopupOpen}
          setIsHeaderPopupOpen={setIsHeaderPopupOpen}
        />

        {/* Routes */}
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
              onCardClick={handleCardClick}          // ✅ preview modal
              onDelete={openDeleteConfirmation}      // ✅ delete confirmation modal
            />
          }
        />
        </Routes>

        <Footer />

        {/* Modals */}
        <AddItemModal
          isOpen={activeModal === "addClothes"}
          onAddItem={handleAddItemSubmit}
          onCloseModal={handleCloseModal}
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
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

/* -------------------
   Browser Wrapper (fix for useLocation)
------------------- */
function App() {
  return (
    <BrowserRouter basename="/se_project_react">
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
