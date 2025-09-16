import { APIkey, latitude, longitude } from "./constants";

// function to fetch weather data
export const getWeather = () => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  )
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      // extract useful info
      const temperature = Math.round(data.main.temp); // °F
      const city = data.name;

      return {
        temp: temperature,
        city: city,
        type: getWeatherCondition(temperature),
        condition: data.weather[0].main, // e.g., Clear, Clouds, Rain
        timeOfDay: data.weather[0].icon.includes("d") ? "Day" : "Night",
      };
    });
};

// function to classify weather type by temperature
export const getWeatherCondition = (temp) => {
  if (temp >= 86) {
    return "hot";
  } else if (temp >= 66 && temp < 86) {
    return "warm";
  } else {
    return "cold";
  }
};
