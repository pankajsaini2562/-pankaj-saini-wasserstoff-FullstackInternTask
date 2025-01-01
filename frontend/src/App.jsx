<h1 className="text-4xl md:text-5xl font-bold text-blue-700 shadow-lg p-4 bg-gradient-to-r from-blue-300 to-blue-100 rounded-lg">
  Weather App
</h1>

<div className="flex flex-col md:flex-row items-center gap-4 w-full">
  <input
    type="text"
    placeholder="Enter city name"
    value={city}
    onChange={(e) => setCity(e.target.value)}
    className="flex-grow py-3 px-5 text-lg md:text-xl bg-gray-100 border border-gray-300 rounded shadow-md w-full md:w-auto"
  />
  <button
    onClick={getWeatherData}
    className="py-3 px-6 text-lg md:text-xl bg-blue-500 text-white font-semibold rounded shadow-md w-full md:w-auto hover:bg-blue-600 transition"
  >
    Get Weather
  </button>
  <button
    onClick={toggleUnit}
    className={`py-3 px-6 text-lg md:text-xl font-semibold rounded shadow-md w-full md:w-auto transition-colors ${
      isCelsius ? "bg-green-500 text-white" : "bg-red-500 text-white"
    } hover:opacity-90`}
  >
    Show in {isCelsius ? "Fahrenheit" : "Celsius"}
  </button>
</div>

{currentWeather && (
  <div className="w-full bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg p-6 rounded-lg space-y-4">
    <h2 className="text-2xl md:text-3xl font-bold text-blue-600 text-center">
      {currentWeather.name}
    </h2>
    <p className="text-lg md:text-xl text-gray-700 text-center">
      Temperature: {isCelsius
        ? `${currentWeather.main.temp}°C`
        : `${convertToFahrenheit(currentWeather.main.temp).toFixed(2)}°F`}
    </p>
    <div className="grid grid-cols-2 text-sm md:text-base text-gray-600">
      <p>
        Min: {isCelsius
          ? `${currentWeather.main.temp_min}°C`
          : `${convertToFahrenheit(currentWeather.main.temp_min).toFixed(2)}°F`}
      </p>
      <p>
        Max: {isCelsius
          ? `${currentWeather.main.temp_max}°C`
          : `${convertToFahrenheit(currentWeather.main.temp_max).toFixed(2)}°F`}
      </p>
      <p>Humidity: {currentWeather.main.humidity}%</p>
      <p>Wind: {currentWeather.wind.speed} m/s</p>
    </div>
    <p className="text-center text-gray-500 text-sm md:text-base">
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
    <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center text-blue-600">
      5-Day Forecast
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {forecast.map((day, index) => (
        <div
          key={index}
          className="p-4 bg-blue-500 text-white rounded-lg shadow-lg text-center space-y-2"
        >
          <p className="text-lg md:text-xl">
            {new Date(day.dt * 1000).toLocaleDateString()}
          </p>
          <p className="font-semibold text-lg md:text-xl">
            Avg Temp: {isCelsius
              ? `${day.main.temp}°C`
              : `${convertToFahrenheit(day.main.temp).toFixed(2)}°F`}
          </p>
          <p className="text-sm md:text-base">{day.weather[0].description}</p>
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
