import React, { useState, useEffect } from "react";
import axios from "axios";
import "./weather.css";
import search from "../assets/search.png";
import cloud from "../assets/cloud.png";
import WeatherCard from "./WeatherCard";

const Weather = () => {
  const [data, setData] = useState(null);
  const [searchCity, setSearchCity] = useState("");
  const [city, setCity] = useState("Kolkata");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api_key = "a11bc58eeb77f8ec12de7c41f49bd49e";

        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`
        );

        console.log(response);

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [city]);

  return (
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
            setCity(searchCity);
          }}
        >
          <img src={search} alt="" />
        </div>
      </div>
      <div>
        <div className="city">{city}</div>
      </div>
      <WeatherCard data={data} />
    </div>
  );
};

export default Weather;
