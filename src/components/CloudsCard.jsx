import React from "react";

function CloudsCard({ data }) {
  const { formattedData, degreeSymbol, weather, weather_icon } = data;

  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="clouds">
      <p className="celsius">
        {formattedData.temp}
        {degreeSymbol}
      </p>
      <div className="cloud-icon">
        {weather[0].main}
        <img src={weather_icon} className="" alt="" />
      </div>
      <p className="des">
        <span>{weather[0].description}</span>
      </p>
      <p className="time">
        <span>{formattedDate}</span>
      </p>
    </div>
  );
}

export default CloudsCard;
