import React from "react";
import "./weather.css";
import cloud from "../assets/cloud.png";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";
const WeatherCard = ({ data }) => {
  return (
    <div className="box-container">
      <div className="box">
        <div className="hid-box">
          <div className="cloud-image">
            <img src={cloud} alt="" className="C-image" />
            <div className="weather-temp">{data?.main.temp}°C</div>
          </div>
          <div className="data-container">
            <div className="element">
              <div>
                <img src={humidity} alt="" />
              </div>
              <div className="data">
                <div className="humidity-percentage">
                  {data?.main?.humidity}%
                </div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <div>
                <img src={wind} alt="" />
              </div>
              <div className="data">
                <div className="speed">{data?.wind?.speed}km/h</div>
                <div className="text">Wind speed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
