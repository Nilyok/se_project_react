import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, clothingItems, onCardClick }) {
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
          temperature={weatherData.temp}
          condition={weatherData.condition}
          timeOfDay={weatherData.timeOfDay}
        />
      </div>

      <section className="clothing-section">
        <p className="clothing-section__subtitle">
          Today is {weatherData.temp}°F / You may want to wear:
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
