import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { checkToken, authorize, register as authRegister } from "../../utils/auth";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { updateUser } from "../../utils/api";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import { getWeather } from "../../utils/weatherApi";

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
  const [currentUser, setCurrentUser] = useState(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);



  /* -------------------
     Fetch Weather + Items on Mount
  ------------------- */

  useEffect(() => {
  getItems()
    .then((items) => setClothingItems(items))
    .catch((err) => console.error("Error loading items:", err));
  }, []);

    useEffect(() => {
    getWeather()
      .then((data) => setWeatherData(data))
      .catch((err) => console.error(err));
  }, []);

  /* -------------------
    Token Validation on App Load
  ------------------- */
  useEffect(() => {
    const token = window.localStorage.getItem("jwt");

    if (!token) return;

    checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log("Token invalid:", err);
        window.localStorage.removeItem("jwt");
      });
  }, []);

    /* -------------------
      Handle Logout
    ------------------- */

  const handleLogout = () => {
    window.localStorage.removeItem("jwt");
    setCurrentUser(null);
  };
    /* -------------------
      Handle Card like/unlike
    ------------------- */
  const handleCardLike = (item) => {
  const token = window.localStorage.getItem("jwt");
  if (!token) return;

  const isLiked = item.likes?.some(
    (id) => id === currentUser?._id
  );

  const request = !isLiked
    ? addCardLike(item._id, token)
    : removeCardLike(item._id, token);

  request
    .then((updatedCard) => {
      setClothingItems((cards) =>
        cards.map((card) =>
          card._id === item._id ? updatedCard : card
        )
      );
    })
    .catch((err) => console.error("Like error:", err));
  };

      /* -------------------
      Edit Profile
    ------------------- */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  function handleEditProfileClick() {
  setIsEditProfilePopupOpen(true);
}

    /* -------------------
      Update User Info
    ------------------- */
const handleUpdateUser = ({ name, avatar }) => {
  const token = window.localStorage.getItem("jwt");
  setIsSavingProfile(true);

  return updateUser({ name, avatar }, token)
    .then((updatedUser) => {
      setCurrentUser(updatedUser);
      handleCloseModal();
    })
    .catch((err) => {
      console.error("Update user error:", err.message || err);
    })
    .finally(() => setIsSavingProfile(false));
};

  /* -------------------
    Handle Login / Register
  ------------------- */
  const navigate = useNavigate();

  const handleLogin = ({ email, password }) => {
    return authorize({ email, password })
      .then((res) => {
        if (res?.token) {
          window.localStorage.setItem("jwt", res.token);
          return checkToken(res.token);
        }
        return Promise.reject(new Error("No token received"));
      })
      .then((userData) => {
        setCurrentUser(userData);
        navigate("/profile");
      })
      .catch((err) => console.error("Login failed:", err));
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    return authRegister({ name, avatar, email, password })
      .then(() => authorize({ email, password }))
      .then((res) => {
        if (res?.token) {
          window.localStorage.setItem("jwt", res.token);
          return checkToken(res.token);
        }
        return Promise.reject(new Error("No token received after register"));
      })
      .then((userData) => {
        setCurrentUser(userData);
        navigate("/profile");
      })
      .catch((err) => console.error("Registration failed:", err));
  };




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
    const token = window.localStorage.getItem("jwt");

    const newItem = {
      name: item.name,
      imageUrl: item.imageUrl,
      weather: item.weather,
    };

    setIsLoading(true);
    addItem(newItem, token)
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
  const token = window.localStorage.getItem("jwt");
  const id = cardToDelete._id;
    setIsLoading(true);
    deleteItem(id, token)
      .then(() => {
  setClothingItems((prev) => prev.filter((item) => item._id !== id));
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
  setIsEditProfilePopupOpen(false);
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
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <AppHeader
            weatherData={weatherData}
            onAddClothesClick={handleAddClothesClick}
            isHeaderPopupOpen={isHeaderPopupOpen}
            setIsHeaderPopupOpen={setIsHeaderPopupOpen}
          />
          <main className="main">
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
                  onCardLike={handleCardLike}
                />
              }
            />
              <Route
                path="/login"
                element={
                  <>
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
                      onCardLike={handleCardLike}
                    />
                    <LoginModal
                      isOpen={true}
                      onClose={() => navigate(-1)}
                      onLogin={handleLogin}
                    />
                  </>
                }
              />
              <Route
                path="/register"
                element={
                  <>
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
                      onCardLike={handleCardLike}
                    />
                    <RegisterModal
                      isOpen={true}
                      onClose={() => navigate(-1)}
                      onRegister={handleRegister}
                    />
                  </>
                }
              />
            <Route
              path="/profile"
              element={
                currentUser ? (
                  <Profile
                    clothingItems={clothingItems}
                    onAddClothesClick={handleAddClothesClick}
                    onCardClick={handleCardClick}
                    onDelete={openDeleteConfirmation}
                    onLogout={handleLogout}
                    onEditProfile={handleEditProfileClick}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            </Routes>
          </main>

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
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={handleCloseModal}
            onUpdateUser={handleUpdateUser}
            isLoading={isSavingProfile}
          />
        </div>
      </CurrentUserContext.Provider>  
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

