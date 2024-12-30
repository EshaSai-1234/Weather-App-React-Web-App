import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = 'your_openweathermap_api_key'; // Replace with your OpenWeatherMap API key

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
        setError('');
      } else {
        setWeather(null);
        setError(data.message || 'City not found.');
      }
    } catch (err) {
      setWeather(null);
      setError('Failed to fetch weather data. Please try again.');
    }
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />
        <button onClick={fetchWeather} className="search-button">
          Search
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description.toUpperCase()}</p>
          <p className="temp">🌡️ {weather.main.temp}°C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬️ Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default App;
