import "./Main.css";
import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, clothingItems, onCardClick }) {
  const { currentTemperatureUnit } = React.useContext(CurrentTemperatureUnitContext);

  /* -------------------
     Filter clothing items by weather
  ------------------- */
  const filteredItems = clothingItems.filter(
    (item) => item.weather.toLowerCase() === weatherData.type.toLowerCase()
  );

  /* -------------------
     Render
  ------------------- */
  return (
    <main className="main">
      <div className="weather-card-container">
        <WeatherCard
          temperature={weatherData.temperature}
          condition={weatherData.condition}
          timeOfDay={weatherData.timeOfDay}
        />
      </div>

      <section className="clothing-section">
        <p className="clothing-section__subtitle">
          Today is {weatherData.temperature[currentTemperatureUnit]}°
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <div className="clothing-section__grid">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
