import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, clothingItems, onCardClick }) {
  // Filter clothing items based on weather type (hot, warm, cold)
  const filteredItems = clothingItems.filter(
    (item) => item.weather.toLowerCase() === weatherData.type.toLowerCase()
  );

  return (
    <main className="main">
      {/* Weather Card */}
      <WeatherCard
        temperature={weatherData.temp}
        condition={weatherData.condition}
        timeOfDay={weatherData.timeOfDay}
      />

      {/* Clothing list */}
      <section className="main__clothing-section">
        <p className="main__subtitle">
          Today is {weatherData.temp}°F / You may want to wear:
        </p>
        <ul className="main__clothing-list">
          {filteredItems.map((item) => (
            <li key={item._id} className="main__clothing-item">
              <ItemCard item={item} onCardClick={onCardClick} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
