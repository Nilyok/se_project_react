import "../WeatherCard/WeatherCard.css";
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


export const weatherImages = {
  DayCloudy,
  DayFog,
  DayRain,
  DaySnow,
  DayStorm,
  DaySunny,
  NightCloudy,
  NightFog,
  NightRain,
  NightSnow,
  NightStorm,
  NightSunny,
};


function WeatherCard({ temperature, condition = "Sunny", timeOfDay = "Day" }) {
    const key = `${timeOfDay}${condition}`;
    const backgroundImage = weatherImages[key];
    
    return (
        <section
        className="weather-card"
        style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
        >
        <p className="weather-card__temp">{temperature}°F</p>
        </section>
    );
}
export default WeatherCard;

