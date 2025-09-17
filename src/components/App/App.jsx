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


// fetch weather on mount
useEffect(() => {
getWeather()
.then((data) => setWeatherData(data))
.catch((err) => console.error(err));
}, []);


function handleAddClothesClick() {
setActiveModal("addClothes");
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
// normalize to use .link for consistency with ItemCard
const itemWithLink = {
_id: Date.now(), // generate id
name: newItem.name,
link: newItem.imageUrl, // map imageUrl to link
weather: newItem.weather,
};


setClothingItems((prev) => [itemWithLink, ...prev]);
setActiveModal("");
}


return (
<>
<Header
location={weatherData ? weatherData.city : "Loading..."}
onAddClothesClick={handleAddClothesClick}
/>


{weatherData && (
<Main
weatherData={weatherData}
clothingItems={clothingItems}
onCardClick={handleCardClick}
/>
)}


<Footer />


{/* Add Clothes modal */}
<ModalWithForm
isOpen={activeModal === "addClothes"}
onClose={handleCloseModal}
title="New garment"
buttonText="Add garment"
onAddItem={handleAddItem}
/>


{/* Preview modal */}
<ItemModal
isOpen={activeModal === "preview"}
onClose={handleCloseModal}
card={selectedCard}
/>
</>
);
}


export default App;