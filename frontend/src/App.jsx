import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [city, setCity] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [units, setUnits] = useState("metric");
  const [isCelsius, setIsCelsius] = useState(true);
  const apiKey = "44c5b4a8cf515c3c7cb3a664e05958c0";

  const getWeatherData = async () => {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`
      );
      setCurrentWeather(weatherResponse.data);
      
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`
      );
      setForecast(
        forecastResponse.data.list.filter((item, index) => index % 8 === 0)
      );

      setError("");
    } catch (err) {
      setError("City not found. Please try again.");
      setCurrentWeather(null);
      setForecast([]);
    }
  };

  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
    setUnits(isCelsius ? "imperial" : "metric");
  };

  const convertToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

  return (
    <div className="flex flex-col items-center p-4 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-amber-700 text-center">Weather App</h1>

      <div className="flex flex-col md:flex-row items-center gap-4 w-full">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-grow py-3 px-5 text-lg bg-gray-100 border border-gray-300 rounded w-full md:w-auto"
        />
        <button
          onClick={getWeatherData}
          className="py-3 px-6 bg-blue-500 text-white font-semibold rounded w-full md:w-auto hover:bg-blue-600"
        >
          Get Weather
        </button>
        <button
          onClick={toggleUnit}
          className={`py-3 px-6 font-semibold rounded w-full md:w-auto transition-colors ${
            isCelsius ? "bg-green-500 text-white" : "bg-red-500 text-white"
          } hover:opacity-90`}
        >
          Show in {isCelsius ? "Fahrenheit" : "Celsius"}
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {currentWeather && (
        <div className="w-full bg-white shadow-md p-6 rounded-lg space-y-4">
          <h2 className="text-2xl font-bold text-amber-400 text-center">
            {currentWeather.name}
          </h2>
          <p className="text-lg text-pink-500 text-center">
            Temperature: {isCelsius
              ? `${currentWeather.main.temp}°C`
              : `${convertToFahrenheit(currentWeather.main.temp).toFixed(2)}°F`}
          </p>
          <div className="text-center">
            <p>Min Temperature: {isCelsius
              ? `${currentWeather.main.temp_min}°C`
              : `${convertToFahrenheit(currentWeather.main.temp_min).toFixed(2)}°F`}
            </p>
            <p className="text-green-500">
              Max Temperature: {isCelsius
                ? `${currentWeather.main.temp_max}°C`
                : `${convertToFahrenheit(currentWeather.main.temp_max).toFixed(2)}°F`}
            </p>
            <p>Humidity: {currentWeather.main.humidity}%</p>
            <p className="text-amber-600">
              Wind: {currentWeather.wind.speed} m/s, {currentWeather.wind.deg}°
            </p>
            <p>Description: {currentWeather.weather[0].description}</p>
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`}
            alt="Weather icon"
            className="mx-auto"
          />
        </div>
      )}

      {forecast.length > 0 && (
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4 text-center">5-Day Forecast</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {forecast.map((day, index) => (
              <div
                key={index}
                className="p-4 bg-blue-500 text-white rounded shadow-md text-center"
              >
                <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
                <p className="font-semibold">
                  Avg Temperature: {isCelsius
                    ? `${day.main.temp}°C`
                    : `${convertToFahrenheit(day.main.temp).toFixed(2)}°F`}
                </p>
                <p>Description: {day.weather[0].description}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt="Weather icon"
                  className="mx-auto"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
