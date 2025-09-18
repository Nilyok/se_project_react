import { APIkey, latitude, longitude } from "./constants";

/* -------------------
   Fetch Weather Data
------------------- */
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
      const temperature = Math.round(data.main.temp); 
      const city = data.name;

      return {
        temp: temperature,
        city,
        type: getWeatherCondition(temperature),
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
