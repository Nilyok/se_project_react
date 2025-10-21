import { apiKey, latitude, longitude } from "./constants";
import { checkResponse } from "./api";

/* -------------------
   Fetch Weather Data
------------------- */
export const getWeather = () => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`,
  )
    .then(checkResponse)
    .then((data) => {
      const tempF = Math.round(data.main.temp);
      const tempC = Math.round(((tempF - 32) * 5) / 9);
      const city = data.name;

      return {
        temperature: { F: tempF, C: tempC },
        city,
        type: getWeatherCondition(tempF),
        condition: data.weather[0].main,
        timeOfDay: data.weather[0].icon.includes("d") ? "Day" : "Night",
      };
    });
};

/* -------------------
   Classify Weather
------------------- */
export const getWeatherCondition = (temp) => {
  if (temp >= 86) {
    return "hot";
  } else if (temp >= 66 && temp < 86) {
    return "warm";
  } else {
    return "cold";
  }
};
