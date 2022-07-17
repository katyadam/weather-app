import "./App.css";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import Search from "./components/Search/Search";
import { weatherApiUrl, weatherApiKey } from "./api";
import { useState } from "react";
import Forecast from "./components/Forecast/Forecast";
import { Helmet } from "react-helmet";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);

  const [forecastWeather, setForecastWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${weatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`
    );

    const forecastFetch = fetch(
      `${weatherApiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherRes = await response[0].json();
        const forecastRes = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherRes });
        setForecastWeather({ city: searchData.label, ...forecastRes });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(currentWeather);
    console.log(forecastWeather);
  };
  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Katy | Weather App</title>
      </Helmet>
      <div className="container">
        <title>My Portfolio | About</title>
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecastWeather && <Forecast data={forecastWeather} />}
      </div>
    </div>
  );
}

export default App;
