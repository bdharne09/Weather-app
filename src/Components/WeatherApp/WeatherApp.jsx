import React, { useEffect, useState, useRef } from "react";
import "./WeatherApp.css";

import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import humidity_icon from "../Assets/humidity.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";

const WeatherApp = () => {
  const api_key = "9e7975b6addbfccd3caf8fd278ecc0c4";
  const [searchClicked, setSearchClicked] = useState(false);
  const inputRef = useRef(null);
  const [wicon, setWicon] = useState(cloud_icon);
  const humidity = document.getElementsByClassName("humidity-percent")[0];
  const wind = document.getElementsByClassName("wind-rate")[0];
  const temperature = document.getElementsByClassName("weather-temp")[0];
  const location = document.getElementsByClassName("weather-location")[0];

  useEffect(function () {
    function handleEvent(e) {
      if (e.code === "Enter") {
        setSearchClicked((prevSearchClicked) => !prevSearchClicked);
      }
    }
    document.addEventListener("keydown", handleEvent);
  }, []);

  useEffect(
    function () {
      inputRef.current.focus();
      async function fetchInfo() {
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value === "") return;

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`;
        try {
          let response = await fetch(url);

          if (!response.ok) throw new Error("not able to fetch movie...");

          let data = await response.json();

          humidity.innerHTML = Math.floor(data.main.humidity) + " %";
          wind.innerHTML = Math.floor(data.wind.speed) + " km/h";
          temperature.innerHTML = Math.floor(data.main.temp) + "°c";
          location.innerHTML = data.name;

          if (
            data.weather[0].icon === "01d" ||
            data.weather[0].icon === "01n"
          ) {
            setWicon(clear_icon);
          } else if (
            data.weather[0].icon === "02d" ||
            data.weather[0].icon === "02n"
          ) {
            setWicon(cloud_icon);
          } else if (
            data.weather[0].icon === "03d" ||
            data.weather[0].icon === "03n"
          ) {
            setWicon(drizzle_icon);
          } else if (
            data.weather[0].icon === "04d" ||
            data.weather[0].icon === "04n"
          ) {
            setWicon(drizzle_icon);
          } else if (
            data.weather[0].icon === "09d" ||
            data.weather[0].icon === "09n"
          ) {
            setWicon(rain_icon);
          } else if (
            data.weather[0].icon === "10d" ||
            data.weather[0].icon === "10n"
          ) {
            setWicon(rain_icon);
          } else if (
            data.weather[0].icon === "13d" ||
            data.weather[0].icon === "13n"
          ) {
            setWicon(snow_icon);
          } else {
            setWicon(clear_icon);
          }

          element[0].value = "";
          inputRef.current.focus();
        } catch (err) {
          element[0].value = "";
          humidity.innerHTML = "0" + " %";
          wind.innerHTML = "0" + " km/h";
          temperature.innerHTML = "0" + "°c";
          location.innerHTML = "-";
          setWicon(cloud_icon);
          console.error(err);
        }
      }
      fetchInfo();
    },
    [searchClicked, humidity, temperature, location, wind]
  );

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search"
          ref={inputRef}
        />
        <div
          className="search-icon"
          onClick={() => {
            setSearchClicked((prevSearchClicked) => !prevSearchClicked);
          }}
        >
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">0°c</div>
      <div className="weather-location">-</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">0%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">0 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
