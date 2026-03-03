import "./App.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import EditProfilePopup from "../EditProfilePopup/EditProfilePopup";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
  updateUser,
} from "../../utils/api";
import {
  checkToken,
  authorize,
  register as authRegister,
} from "../../utils/auth";
import { getWeather } from "../../utils/weatherApi";

/* ------------------- HEADER WRAPPER ------------------- */
function AppHeader({
  weatherData,
  onAddClothesClick,
  isHeaderPopupOpen,
  setIsHeaderPopupOpen,
  onLoginClick,
  onRegisterClick,
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
      onLoginClick={onLoginClick}
      onRegisterClick={onRegisterClick}
      variant={variant}
    />
  );
}

/* ------------------- MAIN APP ------------------- */
function AppContent() {
  const navigate = useNavigate();

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
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  /* ------------------- INITIAL LOAD ------------------- */
  useEffect(() => {
    getItems().then(setClothingItems).catch(console.error);

    getWeather().then(setWeatherData).catch(console.error);
  }, []);

  /* ------------------- TOKEN CHECK ------------------- */
  useEffect(() => {
    const token = window.localStorage.getItem("jwt");
    if (!token) {
      setIsAuthLoading(false);
      return;
    }

    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.error("Token invalid:", err);
        window.localStorage.removeItem("jwt");
        setCurrentUser(null);
      })
      .finally(() => setIsAuthLoading(false));
  }, []);

  /* ------------------- AUTH ------------------- */
  const handleLogin = ({ email, password }) => {
    setAuthError(""); // clear previous error

    return authorize({ email, password })
      .then((res) => {
        if (!res?.token) throw new Error("No token");

        window.localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoginOpen(false);
        navigate("/");
      })
      .catch((err) => {
        console.error("Login failed:", err);
        setAuthError("Email or password incorrect");
        throw err; // keep promise chain intact
      });
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    setAuthError("");

    return authRegister({ name, avatar, email, password })
      .then(() => authorize({ email, password })) // auto-login after signup
      .then((res) => {
        if (!res?.token) throw new Error("No token received");
        window.localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsRegisterOpen(false); // close modal
        navigate("/");            // go home
      })
      .catch((err) => {
        console.error("Register failed:", err);
        setAuthError("Registration failed. Please try again.");
        throw err; // IMPORTANT: keep promise chain so RegisterModal can show error too
      });
  };

  const handleLogout = () => {
    window.localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsHeaderPopupOpen(false);
    navigate("/");
    setAuthError("");
  };

  /* ------------------- PROFILE UPDATE ------------------- */
  const handleUpdateUser = ({ name, avatar }) => {
    const token = window.localStorage.getItem("jwt");
    setIsSavingProfile(true);

    updateUser({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setIsEditProfilePopupOpen(false);
      })
      .finally(() => setIsSavingProfile(false));
  };

  /* ------------------- CARD LIKE ------------------- */
  const handleCardLike = (item) => {
    const token = window.localStorage.getItem("jwt");
    if (!token) return;

    const isLiked = item.likes?.includes(currentUser?._id);

    const request = isLiked
      ? removeCardLike(item._id, token)
      : addCardLike(item._id, token);

    request
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((c) => (c._id === item._id ? updatedCard : c)),
        );
      })
      .catch((err) => {
        console.error("Like failed:", err);
      });
  };

  /* ------------------- ADD ITEM ------------------- */
  const handleAddItemSubmit = (item, resetForm) => {
    const token = window.localStorage.getItem("jwt");
    setIsLoading(true);

    addItem(item, token)
      .then((saved) => {
        setClothingItems((prev) => [saved, ...prev]);
        resetForm(); // ✅ keep this
        setActiveModal("");
      })
      .catch((err) => {
        console.error("Add item failed:", err);
      })
      .finally(() => setIsLoading(false));
  };

  /* ------------------- DELETE ITEM ------------------- */
  const handleCardDelete = () => {
    if (!cardToDelete) return;
    const token = window.localStorage.getItem("jwt");

    deleteItem(cardToDelete._id, token)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((i) => i._id !== cardToDelete._id),
        );
        setActiveModal("");
      })
      .catch((err) => {
        console.error("Delete failed:", err);
        // Optional: show error state in modal
      });
  };

  /* ------------------- RENDER ------------------- */
  return (
    <CurrentTemperatureUnitContext.Provider
      value={{
        currentTemperatureUnit,
        handleToggleSwitchChange: () =>
          setCurrentTemperatureUnit((p) => (p === "F" ? "C" : "F")),
      }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <AppHeader
            weatherData={weatherData}
            onAddClothesClick={() => setActiveModal("addClothes")}
            isHeaderPopupOpen={isHeaderPopupOpen}
            setIsHeaderPopupOpen={setIsHeaderPopupOpen}
            onLoginClick={() => setIsLoginOpen(true)}
            onRegisterClick={() => setIsRegisterOpen(true)}
          />

          <main className="main">
            <Routes>
              <Route
                path="/"
                element={
                  isAuthLoading ? (
                    <div>Loading...</div>
                  ) : currentUser ? (
                    <Main
                      weatherData={weatherData}
                      clothingItems={clothingItems}
                      onCardClick={(item) => {
                        setSelectedCard(item);
                        setActiveModal("preview");
                      }}
                      onCardLike={handleCardLike}
                    />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />

              <Route
                path="/profile"
                element={
                  isAuthLoading ? (
                    <div className="page__loading">Loading...</div>
                  ) : currentUser ? (
                    <Profile
                      clothingItems={clothingItems}
                      onAddClothesClick={() => setActiveModal("addClothes")}
                      onCardClick={(item) => {
                        setSelectedCard(item);
                        setActiveModal("preview");
                      }}
                      onDelete={(card) => {
                        setCardToDelete(card);
                        setActiveModal("confirmDelete");
                      }}
                      onLogout={handleLogout}
                      onEditProfile={() => setIsEditProfilePopupOpen(true)}
                    />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            </Routes>
          </main>

          <Footer />

          {/* AUTH MODALS */}
          <LoginModal
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
            onLogin={handleLogin}
            error={authError}
            onSwitch={() => {
              setIsLoginOpen(false);
              setIsRegisterOpen(true);
            }}
          />

          <RegisterModal
            isOpen={isRegisterOpen}
            onClose={() => setIsRegisterOpen(false)}
            onRegister={handleRegister}
            onSwitch={() => {
              setIsRegisterOpen(false);
              setIsLoginOpen(true);
            }}
          />

          {/* OTHER MODALS */}
          <AddItemModal
            isOpen={activeModal === "addClothes"}
            onAddItem={handleAddItemSubmit}
            onCloseModal={() => setActiveModal("")}
            isLoading={isLoading}
          />

          <ItemModal
            isOpen={activeModal === "preview"}
            onClose={() => setActiveModal("")}
            card={selectedCard}
            onDelete={() => {
              setCardToDelete(selectedCard);
              setActiveModal("confirmDelete");
            }}
          />

          <DeleteConfirmationModal
            isOpen={activeModal === "confirmDelete"}
            onClose={() => setActiveModal("")}
            onConfirm={handleCardDelete}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={() => setIsEditProfilePopupOpen(false)}
            onUpdateUser={handleUpdateUser}
            isLoading={isSavingProfile}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

/* ------------------- WRAPPER ------------------- */
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
