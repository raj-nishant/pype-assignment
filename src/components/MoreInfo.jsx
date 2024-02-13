import React from "react";

function MoreInfo({ formattedData, degreeSymbol, main, clouds }) {
  return (
    <div className="more-info">
      <p className="">
        Real Feel:{" "}
        <span>
          {formattedData.feels_like}
          {degreeSymbol}
        </span>
      </p>
      <p className="">
        Humidity: <span>{main.humidity}%</span>
      </p>
      <p className="">
        Cover: <span>{clouds.all}%</span>
      </p>
      <p className="">
        Min Temp:{" "}
        <span>
          {formattedData.temp_min}
          {degreeSymbol}
        </span>
      </p>
      <p className="">
        Max Temp:{" "}
        <span>
          {formattedData.temp_max}
          {degreeSymbol}
        </span>
      </p>
    </div>
  );
}

export default MoreInfo;
