import React, { useState } from "react";
import axios from "axios";
export default function App() {
  //cit state
  const [city, setCity] = useState("");
  //weather state
  const [currentWeather, setCurrentWeather] = useState(null);
  //forecast state
  const [forecast, setForecast] = useState([]);
  //error state
  const [error, setError] = useState("");
  //unit state
  const [units, setUnits] = useState("metric");
  // 'metric' for Celsius, 'imperial' for Fahrenheit
  const [isCelsius, setIsCelsius] = useState(true);
  //api for weather
  const apiKey = "44c5b4a8cf515c3c7cb3a664e05958c0";
  const getWeatherData = async () => {
    try {
      // Fetch current weather for selected city
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`
      );
      console.log(weatherResponse.data);
      setCurrentWeather(weatherResponse.data);
      setCity("");

      // Fetch 5-day forecast for selected city
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`
      );
      setForecast(
        forecastResponse.data.list.filter((item, index) => index % 8 === 0)
      );

      setError("");
    } catch (err) {
      //set error state
      setError("City not found. Please try again.");
      setCurrentWeather(null);
      setForecast([]);
    }
  };

  ////toggle function

  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
  };
  // function to conversion
  const convertToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

  return (
    <div className=" flex flex-col mx-auto p-4">
      <h1 className="text-3xl flex items-center font-bold mb-4 text-amber-700">
        Weather App
      </h1>
      <div className=" flex  gap-2 mx-auto mb-5">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="py-3 px-5 text-xl bg-[#f4f4f4]  border border-gray-300 rounded"
        />
        <button
          onClick={getWeatherData}
          className=" flex text-center items-center px-2 w-full bg-blue-500 text-white  rounded"
        >
          Get Weather
        </button>
        <button
          className={`${
            isCelsius ? "bg-green-500" : "bg-red-500"
          } flex text-center items-center px-2 w-full bg-blue-500 text-white  rounded`}
          onClick={toggleUnit}
        >
          Show in {isCelsius ? " Fahrenheit" : "Celsius"}
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {currentWeather && (
        <div className="mb-4">
          <h2 className="text-xl font-extrabold text-amber-400">
            {currentWeather.name}
          </h2>
          <p className="text-pink">
            Temperature:
            {isCelsius
              ? `${currentWeather.main.temp}°C`
              : `${convertToFahrenheit(currentWeather.main.temp).toFixed(2)}°F`}
          </p>
          <p>
            Min Temperature:
            {isCelsius
              ? `${currentWeather.main.temp_min}°C`
              : `${convertToFahrenheit(currentWeather.main.temp_min).toFixed(
                  2
                )}°F`}
          </p>
          <p className="text-green-500">
            Max Temperature:
            {isCelsius
              ? `${currentWeather.main.temp_max}°C`
              : `${convertToFahrenheit(currentWeather.main.temp_max).toFixed(
                  2
                )}°F`}
          </p>
          <p>Humidity: {currentWeather.main.humidity}%</p>
          <p className="text-amber-600">
            Wind: {currentWeather.wind.speed} m/s,
            {currentWeather.wind.deg}°
          </p>
          <p>Description: {currentWeather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`}
            alt="Weather icon"
          />
        </div>
      )}
      {forecast.length > 0 && (
        <div>
          <h2 className="text-xl  font-semibold mb-2">5-Day Forecast</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 ">
            {forecast.map((day, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 
                cursor-pointer
                bg-blue-500
                 rounded"
              >
                <p className="text-white">
                  {new Date(day.dt * 1000).toLocaleDateString()}
                </p>
                <p
                  className="text-white
                font-semibold"
                >
                  Avg Temperature:
                  {isCelsius
                    ? `${currentWeather.main.temp}°C`
                    : `${convertToFahrenheit(currentWeather.main.temp).toFixed(
                        2
                      )}°F`}
                </p>
                <p className="text-white">
                  Description: {day.weather[0].description}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt="Weather icon"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
