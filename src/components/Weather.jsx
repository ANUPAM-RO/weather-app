import React, { useState, useEffect } from "react";
import axios from "axios";
import "./weather.css";
import search from "../assets/search.png";
import cloud from "../assets/cloud.png";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";
import WeatherCard from "./WeatherCard";

const Weather = () => {
  const [data, setData] = useState(null);
  const [searchCity, setSearchCity] = useState("");
  const [city, setCity] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getAddressFromCoordinates(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const getAddressFromCoordinates = async (latitude, longitude) => {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();


      if (response.ok && data.display_name) {
        setCity(data.address.state);
      } else {
        console.error("Unable to fetch address.");
      }
    } catch (error) {
      console.error("Error fetching address:", error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api_key = "2ee787d96ca84609afc130149232812";
        const api_url = "http://api.weatherapi.com/v1/forecast.json";

        const response = await axios.get(
          `${api_url}?key=${api_key}&q=${city}&days=7`
        );

        console.log(response);

        setData(response.data);
        setIsError(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      }
    };

    fetchData();
  }, [city]);

  return (
    <>
      {isError ? (
        <div className="location-error"> Location not found </div>
      ) : (
        <div className="container">
          <div className="top-bar">
            <input
              type="text"
              onChange={(e) => setSearchCity(e.target.value)}
              className="cityInput"
              placeholder="Enter your city...."
            />
            <div
              className="search-icon"
              onClick={() => {
                setCity(searchCity.toLowerCase());
              }}
            >
              <img src={search} alt="" />
            </div>
          </div>
          <div>
            <div className="city">{city}</div>
          </div>
          <div className="cloud-image">
            <img src={cloud} alt="" className="C-image" />
            <div className="weather-day">TODAY</div>
            <div className="weather-temp">{data?.current?.temp_c}°C</div>
          </div>
          <div className="data-container">
            <div className="element">
              <div>
                <img src={humidity} alt="" />
              </div>
              <div className="data">
                <div className="humidity-percentage">
                  {data?.current?.humidity}%
                </div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <div>
                <img src={wind} alt="" />
              </div>
              <div className="data">
                <div className="speed">{data?.current?.wind_kph}km/h</div>
                <div className="text">Wind speed</div>
              </div>
            </div>
          </div>
          <div className="box-container">
            <div className="box">
              <div className="hid-box">
                {data?.forecast?.forecastday?.map((data, index) => (
                  <WeatherCard data={data} key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Weather;
