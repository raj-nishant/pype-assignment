import React, { useMemo } from "react";
import "../css/SummaryCard.css";
import convertToFahrenheit from "../helper/convertToFahrenheit";

function SummaryCard({ day, isFahrenheitMode, degreeSymbol }) {
  const day_icon = `${
    "https://openweathermap.org/img/wn/" + day.weather[0]["icon"]
  }@2x.png`;

  const formattedTemp = useMemo(
    () =>
      Math.round(
        isFahrenheitMode ? convertToFahrenheit(day.main.temp) : day.main.temp
      ),
    [day.main.temp, isFahrenheitMode]
  );

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(day.dt_txt));

  return (
    <li className="summary-items">
      <div>
        <p className="">
          {formattedTemp}
          {degreeSymbol}
        </p>
        <p className="">
          {day.weather[0].main}
          <img src={day_icon} alt="" />
        </p>
        <p className="">{day.weather[0].description}</p>
        <p className="">{formattedTime}</p>
      </div>
    </li>
  );
}

export default SummaryCard;
