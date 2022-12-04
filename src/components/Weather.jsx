import React, { useEffect, useState, useRef } from "react";
import "./Weather.css";
import api from "./api";
import { BsCloudSun } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";
import axios from "axios";
const Weather = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [currentData, setCurrentData] = useState("");
  const [searchCountry, setSearchCountry] = useState("");
  const [destinatedLocation, setDestinatedLocation] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [checker, setChecker] = useState(false);
  const [changeUnit, setChangeUnit] = useState(true);
  const [changeWeatherSpeed, setChangeWeatherSpeed] = useState(true)
  const newLocation = useRef(null);
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  function formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
  }
  function formatDate(date) {
    let [year, month, day] = date.split("-");
    let numberDay = parseInt(day);
    switch (numberDay) {
      case 1:
        day = "1st";
        break;
      case 2:
        day = "2nd";
        break;
      case 3:
        day = "3rd";
        break;
      case 21:
        day = "21st";
        break;
      case 22:
        day = "22nd";
        break;
      case 23:
        day = "23rd";
        break;
      case 31:
        day = "31st";
        break;
      default:
        day = numberDay + "th";
    }
    switch (month) {
      case "01":
        month = months[0];
        break;
      case "02":
        month = months[1];
        break;
      case "03":
        month = months[2];
        break;
      case "04":
        month = months[3];
        break;
      case "05":
        month = months[4];
        break;
      case "06":
        month = months[5];
        break;
      case "07":
        month = months[6];
        break;
      case "09":
        month = months[8];
        break;
      case "10":
        month = months[9];
        break;
      case "11":
        month = months[10];
        break;
      case "12":
        month = months[11];
        break;
      default:
        month = month;
    }
    return `${day} ${month} ${year}`;
  }
  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://geolocation-db.com/json/67273a00-5c4b-11ed-9204-d161c2da74ce"
  //     )
  //     .then((response) => {
  //       const { latitude } = response.data;
  //       const { longitude } = response.data;
  //       setLatitude(latitude);
  //       setLongitude(longitude);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    const fetchWeather = async () => {
      try {
        const responses = await api.get("/current.json", {
          params: {
            q: `${latitude},${longitude}`,
          },
        });
        if (responses) {
          console.log(responses)
          const [date, time] = responses.data.location.localtime.split(" ");
          const { name } = responses.data.location;
          const { country } = responses.data.location;
          setCurrentLocation(`${name}, ${country}`);
          setCurrentTime(formatTime(time));
          setCurrentDate(formatDate(date));
          setCurrentData(responses.data.current);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeather();
  }, [latitude, longitude]);
  const searchLocation = async () => {
    try {
      const responses = await api.get("/current.json", {
        params: {
          q: searchCountry,
        },
      });
      if (responses) {
        console.log(responses);
        const { name } = responses.data.location;
        const { country } = responses.data.location;
        const [date, time] = responses.data.location.localtime.split(" ");
        setCurrentTime(formatTime(time));
        setCurrentDate(formatDate(date));
        setDestinatedLocation(`${name}, ${country}`);
        setCurrentData(responses.data.current);
      }
    } catch (err) {
      if (err) {
        setCurrentDate(err.response.data.error.message);
        setDestinatedLocation("");
        setCurrentData("");
        setCurrentTime("");
      }
    }
  };
  const handleSearch = () => {
    searchLocation();
    setSearchCountry("");
    setChecker(true);
  };
  function convertTempUnit() {
    if (changeUnit) {
      setChangeUnit(false);
    } else {
      setChangeUnit(true);
    }
  }
  function convertWeatherSpeed() {
          if (changeWeatherSpeed) {
        setChangeWeatherSpeed(false);
      } else {
        setChangeWeatherSpeed(true);
      }
  }
  return (
    <main>
      <div className="container-fluid weather-body">
        <h1 className="title">
          Local Weather App{" "}
          <BsCloudSun style={{ color: "#1116e2e", fontSize: "2rem" }} />{" "}
        </h1>
        <div className="weather-main-2">
          <div className="current-location">
            <h5>
              Current Location -{" "}
              <span className="country-name">
                {currentLocation}
                <ImLocation2 />
              </span>
            </h5>
          </div>
          <div className="title-search">
            <h4>Search by City Name or Zip Code</h4>
          </div>
          <div class="row g-3 main-search">
            <div class="col-3 ">
              <input
                className="form-control city-name"
                ref={newLocation}
                placeholder={checker ? destinatedLocation : "City Name"}
                value={searchCountry}
                onChange={(event) => setSearchCountry(event.target.value)}
              />
            </div>
            <div className="col-3">
              <input
                class="form-control zip-code"
                placeholder="Zip Code"
                onChange={(event) => setSearchCountry(event.target.value)}
              />
            </div>
            <div className="search-button col-2" onClick={handleSearch}>
              <button type="button" class="btn btn-success btn-sm">
                Search
              </button>
            </div>
          </div>
          <div className="display-mainbox">
            <div className="display-innerbox">
              <div className="date">{currentDate}</div>
              <div className="time">{currentTime}</div>
              <div className="temperature-box">
                <div className="temp">
                  Temp
                  <div
                    className="val"
                    style={{ cursor: "pointer" }}
                    onClick={convertTempUnit}
                  >
                    {changeUnit ? currentData.temp_c : currentData.temp_f}
                    <span style={{ color: "darkblue" }}>
                      {changeUnit ? "°C" : "°F"}
                    </span>
                  </div>
                </div>
                <div className="humidity">
                  Humidity
                  <div className="val">{currentData.humidity}</div>
                </div>
                <div className="wind">
                  Windspeed 
                  <div className="val"  style={{ cursor: "pointer" }} onClick={convertWeatherSpeed}>{changeWeatherSpeed ? currentData.wind_kph : currentData.wind_mph}<span style={{color: "darkblue"}}>  {changeWeatherSpeed ? "kph" : "mph"}</span></div>
                </div>
              </div>
                  <div style={{color: "red", textAlign: "center"}}>Powered by <a href="https://www.weatherapi.com/" title="Weather API" style={{textDecoration: "none", color: "green"}}>WeatherAPI.com</a></div>
            </div>
          </div>
        </div>
      </div>
    
    </main>
  );
};

export default Weather;
