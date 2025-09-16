import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { defaultClothingItems } from "../../utils/clothingItems";

function App() {
  const location = "New York";

  // state for weather (dummy for now)
  const weatherData = {
    temp: 75,
    type: "hot",
    condition: "Sunny",
    timeOfDay: "Day",
  };

  // state for clothing items
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  // state for modals
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  // open modal handlers
  function handleAddClothesClick() {
    setActiveModal("addClothes");
  }

  function handleCardClick(item) {
    setSelectedCard(item);
    setActiveModal("preview");
  }

  // close modal handler
  function handleCloseModal() {
    setActiveModal("");
    setSelectedCard(null);
  }

  return (
    <>
      <Header location={location} onAddClothesClick={handleAddClothesClick} />
      <Main
        weatherData={weatherData}
        clothingItems={clothingItems}
        onCardClick={handleCardClick}
      />
      <Footer />

      {/* Add Clothes modal */}
      <ModalWithForm
        isOpen={activeModal === "addClothes"}
        onClose={handleCloseModal}
        title="New Garment"
        buttonText="Add"
        name="add-garment"
      >
        {/* form fields will go here */}
      </ModalWithForm>

      {/* Preview Item modal */}
      <ItemModal
        isOpen={activeModal === "preview"}
        onClose={handleCloseModal}
        card={selectedCard}
      />
    </>
  );
}

export default App;
