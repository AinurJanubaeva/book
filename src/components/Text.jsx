import React, { useState } from 'react';
import axios from 'axios';
import "./Text.css"

const Text = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

//   const fetchWeather = async () => {
//     const apiKey = 'your_api_key_here'; 
//     const baseUrl = "https://home.openweathermap.org/history_bulks/new";


//     try {
//       const response = await axios.get(baseUrl);
//       setWeather(response.data);
//       setError('');
//     } catch (err) {
//       setError('Şehir bulunamadı, lütfen doğru bir şehir adı girin.');
//       setWeather(null);
//     }
//   };

const fetchWeather = async () => {
    const apiKey = 'your_api_key_here'; 
    const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`;

    // const baseUrl = "https://home.openweathermap.org/history_bulks/new"; // Corrected this line
    try {
      const response = await axios.get(baseUrl);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  


  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather();
    } else {
      setError('Lütfen bir şehir adı girin.');
    }
  };

  return (
    <div className="app">
      <h1>Hava Durumu Uygulaması</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Şehir adı girin..."
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Ara</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Sıcaklık: {weather.main.temp}°C</p>
          <p>Hava: {weather.weather[0].description}</p>
          <p>Nem: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default Text;



