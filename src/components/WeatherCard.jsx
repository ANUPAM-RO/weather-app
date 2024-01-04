import React from "react";
import "./weather.css";
import cloud from "../assets/cloud.png";
const WeatherCard = ({ data }) => {
  return (
    <div className="card-weather">
      <div className="cloud-image">
        <img src={cloud} alt="" className="C-image" />
        <div className="weather-day">{data?.date}</div>
        <div className="weather-temp-container">
          <div>MAX TEMP- {data?.day?.maxtemp_c}°C</div>
          <div>MIN TEMP- {data?.day?.mintemp_c}°C</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
