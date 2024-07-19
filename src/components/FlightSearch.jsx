import { useState } from "react";
import Autosuggest from "./Autosuggest";

const FlightSearch = () => {
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  const [travelClass, setTravelClass] = useState("Economy");
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");

  const handleCountChange = (type, delta) => {
    if (type === "adult") {
      setAdultCount(Math.max(0, Math.min(adultCount + delta, 9)));
    } else if (type === "child") {
      setChildCount(Math.max(0, Math.min(childCount + delta, 9)));
    } else if (type === "infant") {
      setInfantCount(Math.max(0, Math.min(infantCount + delta, 9)));
    }
  };

  const handleFromCityChange = (city) => {
    setFromCity(city);
  };

  const handleToCityChange = (city) => {
    setToCity(city);
  };

  return (
    <div className="md:w-[50%] w-[96%] mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold mb-4">Flight Search</h2>
      <Autosuggest
        onFromCityChange={handleFromCityChange}
        onToCityChange={handleToCityChange}
      />
      <div className="space-y-2">
        {/* Traveller and class */}
        <div className="flex py-2 border-b-2 border-gray-800 justify-between">
          <h3 className="font-medium text-xl text-blue-700">
            Travellers and Class
          </h3>
          <p className="text-lg font-medium text-black">
            {travelClass} , {adultCount + childCount + infantCount}
          </p>
        </div>

        {/* Traveller Count Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <label className="block text-lg font-medium">Adults</label>
            <div className="flex justify-center items-center space-x-2 mt-2">
              <button
                onClick={() => handleCountChange("adult", -1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <span className="text-lg">{adultCount}</span>
              <button
                onClick={() => handleCountChange("adult", 1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>
          </div>
          <div className="text-center">
            <label className="block text-lg font-medium">Children</label>
            <div className="flex justify-center items-center space-x-2 mt-2">
              <button
                onClick={() => handleCountChange("child", -1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <span className="text-lg">{childCount}</span>
              <button
                onClick={() => handleCountChange("child", 1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>
          </div>
          <div className="text-center">
            <label className="block text-lg font-medium">Infants</label>
            <div className="flex justify-center items-center space-x-2 mt-2">
              <button
                onClick={() => handleCountChange("infant", -1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <span className="text-lg">{infantCount}</span>
              <button
                onClick={() => handleCountChange("infant", 1)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Class Selection */}
        <div className="space-y-2 border-t-2 border-gray-700 py-1">
          <label className="font-medium text-xl text-blue-700">Class</label>
          <div className="flex flex-col items-start gap-y-4">
            <div>
              <input
                type="radio"
                id="economy"
                name="class"
                value="Economy"
                checked={travelClass === "Economy"}
                onChange={() => setTravelClass("Economy")}
                className="mr-2"
              />
              <label htmlFor="economy">Economy</label>
            </div>
            <div>
              <input
                type="radio"
                id="premiumEconomy"
                name="class"
                value="Premium Economy"
                checked={travelClass === "Premium Economy"}
                onChange={() => setTravelClass("Premium Economy")}
                className="mr-2"
              />
              <label htmlFor="premiumEconomy">Premium Economy</label>
            </div>
            <div>
              <input
                type="radio"
                id="business"
                name="class"
                value="Business"
                checked={travelClass === "Business"}
                onChange={() => setTravelClass("Business")}
                className="mr-2"
              />
              <label htmlFor="business">Business</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
