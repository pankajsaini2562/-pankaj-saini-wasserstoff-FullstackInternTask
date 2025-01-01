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
    <div className="flex flex-col items-center p-4 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold text-blue-700 shadow-md px-4 py-2 bg-gradient-to-r from-blue-200 to-blue-50 rounded">
        Weather App
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-4 w-full">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-grow py-3 px-5 text-lg bg-gray-100 border border-gray-300 rounded shadow w-full md:w-auto"
        />
        <button
          onClick={getWeatherData}
          className="py-3 px-6 bg-blue-500 text-white font-semibold rounded shadow w-full md:w-auto hover:bg-blue-600 transition"
        >
          Get Weather
        </button>
        <button
          onClick={toggleUnit}
          className={`py-3 px-6 font-semibold rounded shadow w-full md:w-auto transition-colors ${
            isCelsius ? "bg-green-500 text-white" : "bg-red-500 text-white"
          } hover:opacity-90`}
        >
          Show in {isCelsius ? "Fahrenheit" : "Celsius"}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-center shadow-md p-4 rounded bg-red-50">
          {error}
        </p>
      )}

      {currentWeather && (
        <div className="w-full bg-gradient-to-br from-blue-50 to-blue-100 shadow-md p-6 rounded-lg space-y-4">
          <h2 className="text-2xl font-bold text-blue-600 text-center">
            {currentWeather.name}
          </h2>
          <p className="text-lg text-gray-700 text-center">
            Temperature:{" "}
            {isCelsius
              ? `${currentWeather.main.temp}°C`
              : `${convertToFahrenheit(currentWeather.main.temp).toFixed(2)}°F`}
          </p>
          <div className="grid grid-cols-2 text-sm text-gray-600">
            <p>Min: {isCelsius
              ? `${currentWeather.main.temp_min}°C`
              : `${convertToFahrenheit(currentWeather.main.temp_min).toFixed(2)}°F`}</p>
            <p>Max: {isCelsius
              ? `${currentWeather.main.temp_max}°C`
              : `${convertToFahrenheit(currentWeather.main.temp_max).toFixed(2)}°F`}</p>
            <p>Humidity: {currentWeather.main.humidity}%</p>
            <p>Wind: {currentWeather.wind.speed} m/s</p>
          </div>
          <p className="text-center text-gray-500">
            {currentWeather.weather[0].description}
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}.png`}
            alt="Weather icon"
            className="mx-auto"
          />
        </div>
      )}

      {forecast.length > 0 && (
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-4 text-center text-blue-600">
            5-Day Forecast
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {forecast.map((day, index) => (
              <div
                key={index}
                className="p-4 bg-blue-400 text-white rounded shadow-lg text-center space-y-2"
              >
                <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
                <p className="font-semibold">
                  Avg Temp: {isCelsius
                    ? `${day.main.temp}°C`
                    : `${convertToFahrenheit(day.main.temp).toFixed(2)}°F`}
                </p>
                <p>{day.weather[0].description}</p>
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
