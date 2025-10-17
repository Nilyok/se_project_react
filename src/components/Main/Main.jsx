import "./Main.css";
import React from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, clothingItems, onCardClick }) {
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext,
  );

  /* -------------------
     Normalize weather type
     (ensure it's always "hot", "warm", or "cold")
  ------------------- */
  const normalizeWeatherType = (type) => {
    if (!type) return "warm"; 
    const lower = type.toLowerCase();

    if (["hot", "sunny", "clear"].includes(lower)) return "hot";
    if (["warm", "mild", "clouds"].includes(lower)) return "warm";
    if (["cold", "snow", "rain"].includes(lower)) return "cold";
    return "warm"; 
  };

  const currentType = normalizeWeatherType(weatherData.type);

  /* -------------------
     Filter clothing items by weather
     Show all if type is unknown or no match
  ------------------- */
  const filteredItems = clothingItems.filter(
    (item) =>
      !item.weather ||
      !["hot", "warm", "cold"].includes(currentType) ||
      item.weather.toLowerCase() === currentType,
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
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ItemCard
                key={item.id || item._id}
                item={item}
                onCardClick={onCardClick}
              />
            ))
          ) : (
            <p className="clothing-section__empty">
              No matching items yet — try adding one!
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

export default Main;
