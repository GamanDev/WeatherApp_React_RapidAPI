import React, { useState } from "react";
import Search from "./components/search/Search";
import "./App.css";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import Forecast from "./components/forecast/Forecast";

const App = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForcast] = useState(null);

  function handleOnSearchChange(searchData) {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (res) => {
        const weatherResponse = await res[0].json();
        const forecastResponse = await res[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForcast({ city: searchData.label, ...forecastResponse });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
};

export default App;
