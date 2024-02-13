import React, { useEffect, useMemo, useState } from "react";
import { RiCelsiusFill, RiFahrenheitFill } from "react-icons/ri";
import { TbMapSearch, TbMoon, TbSearch, TbSun } from "react-icons/tb";
import "../App.css";

import DetailsCard from "./DetailsCard";
import SummaryCard from "./SummaryCard";
import lost from "../assets/lost.svg";
import SearchPlace from "../assets/search.svg";

const Home = () => {
  // Variable declarations
  const API_KEY = "88762fccb0c47213ba22b25e936e81af";
  const [noData, setNoData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState();
  const [weatherIcon, setWeatherIcon] = useState(
    "https://openweathermap.org/img/wn/10n@2x.png"
  );
  const [currentLanguage, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "en";
  });

  const [loading, setLoading] = useState(false);
  const [isFahrenheitMode, setIsFahrenheitMode] = useState(false);
  const degreeSymbol = useMemo(
    () => (isFahrenheitMode ? "\u00b0F" : "\u00b0C"),
    [isFahrenheitMode]
  );
  const [active, setActive] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Code logic
  useEffect(() => {
    document.body.classList.toggle("dark", isDark);
  }, [isDark]);

  // Set theme based on device preference
  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

    setIsDark(darkModeQuery.matches);

    const handleDarkModeChange = (event) => {
      setIsDark(event.matches);
    };

    darkModeQuery.addEventListener("change", handleDarkModeChange);

    return () => {
      darkModeQuery.removeEventListener("change", handleDarkModeChange);
    };
  }, []);

  const toggleDark = () => {
    setIsDark((prev) => !prev);
  };

  const activate = () => {
    setActive(true);
  };

  const toggleFahrenheit = () => {
    setIsFahrenheitMode((prev) => !prev);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    getWeather(searchTerm);
  };

  const getWeather = async (location) => {
    setLoading(true);
    setWeatherData([]);
    const query =
      typeof location === "string"
        ? `q=${location}`
        : `lat=${location[0]}&lon=${location[1]}`;

    const url = `https://api.openweathermap.org/data/2.5/forecast?`;

    try {
      const res = await fetch(
        `${url}${query}&appid=${API_KEY}&units=metric&cnt=5&exclude=hourly,minutely`
      );
      const data = await res.json();

      if (data.cod !== "200") {
        setNoData("Location Not Found");
        setCity("Unknown Location");
      } else {
        setWeatherData(data);
        setCity(`${data.city.name}, ${data.city.country}`);
        setWeatherIcon(
          `https://openweathermap.org/img/wn/${data.list[0].weather[0]["icon"]}@4x.png`
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const myIP = (location) => {
    const { latitude, longitude } = location.coords;
    getWeather([latitude, longitude]);
  };

  const searchCountries = (input) => {
    setSearchTerm(input);
  };

  // Load current location weather info on load
  useEffect(() => {
    window.addEventListener("load", () => {
      navigator.geolocation.getCurrentPosition(myIP);
    });

    return () => {
      window.removeEventListener("load", myIP);
    };
  }, []);

  return (
    <div className="container">
      <div className="blurry"></div>
      <div className="content">
        <div className="form-container">
          <div className="name">
            <div className="toggle-container">
              <input
                type="checkbox"
                className="checkbox"
                id="checkbox"
                checked={isDark}
                onChange={toggleDark}
              />
              <label htmlFor="checkbox" className="label">
                <TbMoon style={{ color: "#a6ddf0" }} />
                <TbSun style={{ color: "#f5c32c" }} />
                <div className="ball" />
              </label>
            </div>
          </div>

          <div className="search">
            <h2
              style={{
                marginRight:
                  currentLanguage === "es" || currentLanguage === "fr"
                    ? "10px"
                    : "0px",
                color: isDark ? "#fff" : "#333",
              }}
            >
              Weather App by Nishant
            </h2>

            <hr
              style={{
                borderBottom: isDark ? "3px solid  #fff" : "3px solid #333",
              }}
            />

            <form className="search-bar" noValidate onSubmit={submitHandler}>
              <input
                onClick={activate}
                placeholder={active ? "" : "Explore cities weather"}
                onChange={(e) => searchCountries(e.target.value)}
                required
                className="input_search"
              />

              <button className="s-icon">
                <TbSearch
                  onClick={() => {
                    navigator.geolocation.getCurrentPosition(myIP);
                  }}
                />
              </button>
            </form>
          </div>
        </div>
        <div className="info-container">
          <div className="info-inner-container">
            <div className="toggle-container">
              <input
                type="checkbox"
                className="checkbox"
                id="fahrenheit-checkbox"
                onChange={toggleFahrenheit}
              />
              <label htmlFor="fahrenheit-checkbox" className="label">
                <RiFahrenheitFill />
                <RiCelsiusFill />
                <div className="ball" />
              </label>
            </div>
          </div>
          {loading ? (
            <div className="loader"></div>
          ) : (
            <span>
              {weatherData.length === 0 ? (
                <div className="nodata">
                  {noData === "Location Not Found" ? (
                    <>
                      <img src={lost} alt="lost" />
                      <p style={{ color: "red" }}>
                        Please enter correct city name
                      </p>
                    </>
                  ) : (
                    <>
                      <img
                        src={SearchPlace}
                        alt="a person thinking about what place to find"
                      />
                      <p style={{ padding: "20px" }}>
                        Search or Allow Location for the data
                      </p>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <DetailsCard
                    weather_icon={weatherIcon}
                    data={weatherData}
                    isFahrenheitMode={isFahrenheitMode}
                    degreeSymbol={degreeSymbol}
                  />
                  <h1 className="title centerTextOnMobile">More</h1>
                  <ul className="summary">
                    {weatherData.list.map((days, index) => (
                      <SummaryCard
                        key={index}
                        day={days}
                        isFahrenheitMode={isFahrenheitMode}
                        degreeSymbol={degreeSymbol}
                      />
                    ))}
                  </ul>
                </>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
