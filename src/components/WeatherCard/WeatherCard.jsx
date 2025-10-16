import React from "react";
import "./WeatherCard.css";

import DayCloudy from "../../images/weather/WeatherCard-Day-Cloudy.svg";
import DayFog from "../../images/weather/WeatherCard-Day-Fog.svg";
import DayRain from "../../images/weather/WeatherCard-Day-Rain.svg";
import DaySnow from "../../images/weather/WeatherCard-Day-Snow.svg";
import DayStorm from "../../images/weather/WeatherCard-Day-Storm.svg";
import DaySunny from "../../images/weather/WeatherCard-Day-Sunny.svg";
import NightCloudy from "../../images/weather/WeatherCard-Night-Cloudy.svg";
import NightFog from "../../images/weather/WeatherCard-Night-Fog.svg";
import NightRain from "../../images/weather/WeatherCard-Night-Rain.svg";
import NightSnow from "../../images/weather/WeatherCard-Night-Snow.svg";
import NightStorm from "../../images/weather/WeatherCard-Night-Storm.svg";
import NightSunny from "../../images/weather/WeatherCard-Night-Sunny.svg";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

/* -------------------
   Weather Image Map
------------------- */
const weatherImages = {
  Day: {
    Clear: DaySunny,
    Clouds: DayCloudy,
    Rain: DayRain,
    Snow: DaySnow,
    Thunderstorm: DayStorm,
    Fog: DayFog,
  },
  Night: {
    Clear: NightSunny,
    Clouds: NightCloudy,
    Rain: NightRain,
    Snow: NightSnow,
    Thunderstorm: NightStorm,
    Fog: NightFog,
  },
};

function WeatherCard({ temperature, condition, timeOfDay }) {
  const imageSrc = weatherImages[timeOfDay]?.[condition] || DaySunny;
  const { currentTemperatureUnit } = React.useContext(
    CurrentTemperatureUnitContext,
  );

  if (!temperature) {
    return (
      <section className="weather-card">
        <img
          src={imageSrc}
          alt={`${condition} ${timeOfDay}`}
          className="weather-card__background"
        />
        <p className="weather-card__temp">--°{currentTemperatureUnit}</p>
      </section>
    );
  }

  return (
    <section className="weather-card">
      <img
        src={imageSrc}
        alt={`${condition} ${timeOfDay}`}
        className="weather-card__background"
      />
      <p className="weather-card__temp">
        {temperature[currentTemperatureUnit]}°{currentTemperatureUnit}
      </p>
    </section>
  );
}

export default WeatherCard;
