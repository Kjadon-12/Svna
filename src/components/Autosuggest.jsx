import { useState, useEffect } from "react";
import airports from "../airports.json";
import { TbArrowsExchange } from "react-icons/tb";

const Autosuggest = ({ onFromCityChange, onToCityChange }) => {
  const [clientCountry, setClientCountry] = useState("");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [focusField, setFocusField] = useState("from"); // Track focus field

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((response) => response.json())
      .then((data) => setClientCountry(data.country_name))
      .catch((error) => console.error("Error fetching IP data:", error));
  }, []);

  useEffect(() => {
    const query = focusField === "from" ? fromCity : toCity;
    if (query.length > 1) {
      const filteredAirports = airports
        .filter((airport) =>
          (airport.cityName || "").toLowerCase().includes(query.toLowerCase())
        )
        .sort((a, b) => {
          if (
            a.countryName === clientCountry &&
            b.countryName !== clientCountry
          )
            return -1;
          if (
            a.countryName !== clientCountry &&
            b.countryName === clientCountry
          )
            return 1;
          return 0;
        });
      setSuggestions(filteredAirports);
    } else {
      setSuggestions([]);
    }
  }, [fromCity, toCity, clientCountry, focusField]);

  const handleSelect = (airport) => {
    if (focusField === "from") {
      onFromCityChange(airport.cityName);
      setFromCity(airport.cityName);
    } else {
      onToCityChange(airport.cityName);
      setToCity(airport.cityName);
    }
    setSuggestions([]);
  };

  return (
    <div className="autosuggest p-4 w-full mx-auto bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1 mr-2">
          <h2 className="text-lg font-bold mb-2">Depart From</h2>
          <input
            type="text"
            value={fromCity}
            onChange={(e) => {
              setFromCity(e.target.value);
              setFocusField("from");
            }}
            placeholder="Type city name"
            className="w-full px-4 py-2 border rounded"
            onFocus={() => setFocusField("from")}
          />
        </div>
        <TbArrowsExchange size={27} className="text-red-700 mt-8" />
        <div className="flex-1 ml-2">
          <h2 className="text-lg font-bold mb-2">Going To</h2>
          <input
            type="text"
            value={toCity}
            onChange={(e) => {
              setToCity(e.target.value);
              setFocusField("to");
            }}
            placeholder="Type city name"
            className="w-full px-4 py-2 border rounded"
            onFocus={() => setFocusField("to")}
          />
        </div>
      </div>

      <div className="max-h-48 overflow-y-auto">
        {suggestions.map((airport) => (
          <div
            key={airport.airportCode}
            className="py-2 px-3 flex items-center cursor-pointer hover:bg-gray-100"
            onClick={() => handleSelect(airport)}
          >
            <div className="flex items-center space-x-3">
              {airport.flagUrl && (
                <img
                  src={airport.flagUrl}
                  alt={airport.countryName}
                  className="w-6 h-4"
                />
              )}
              <div className="flex flex-col">
                <div className="font-medium">{airport.cityName}</div>
                <div>
                  {airport.airportName} ({airport.airportCode})
                </div>
              </div>
            </div>
            <div className="ml-auto">{airport.countryName}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Autosuggest;
