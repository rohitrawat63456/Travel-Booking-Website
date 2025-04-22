import { toast } from "react-toastify";
import { useRef, useState } from "react";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";
import { HiCurrencyRupee } from "react-icons/hi2";
export const Flights = () => {
  const [operatingFlights, setOperatingFlights] = useState(null);
  const from = useRef(null);
  const to = useRef(null);
  const passengers = useRef(null);
  const searchFlightHandler = async () => {
    const data = {
      from: from.current.value,
      to: to.current.value,
    };
    console.log(data);
    console.log("searchFlightHandler called");
    const response = await fetch("http://localhost:8000/getFlightsData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const flightData = await response.json();
    console.log(flightData);
    if (!flightData.success) {
      toast.warning(flightData.message);
    } else {
      setOperatingFlights(flightData.flightsOperatingFromGivenCity);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative h-72 w-full">
        <img
          src="https://www.savethestudent.org/uploads/flights.jpg"
          alt="Flight"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold">Book Your Flight</h1>
          <p className="text-lg">Find the best deals on flights worldwide</p>
        </div>
      </div>

      {/* Search Form */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg -mt-10 relative z-10">
        <h2 className="text-xl font-semibold mb-4">Search Flights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center border p-2 rounded-md">
            <FaPlaneDeparture className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="From"
              className="w-full outline-none bg-transparent"
              ref={from}
            />
          </div>
          <div className="flex items-center border p-2 rounded-md">
            <FaPlaneArrival className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="To"
              className="w-full outline-none bg-transparent"
              ref={to}
            />
          </div>
          <div className="flex items-center border p-2 rounded-md">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <input type="date" className="w-full outline-none bg-transparent" />
          </div>
          <button
            className="col-span-1 md:col-span-2 lg:col-span-3 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={searchFlightHandler}
          >
            Search Flights
          </button>
        </div>
      </div>

      {/* Flight Listings */}
      {operatingFlights  && (
        <div className="max-w-6xl mx-auto mt-12 px-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
          ✈️ Available Flights
        </h2>
      
        <div className="space-y-6">
          {operatingFlights.map((flight, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 p-6 rounded-2xl shadow hover:shadow-lg transition duration-300 ease-in-out flex justify-between items-center"
            >
              {/* Left Section */}
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-blue-900">
                  {flight.flightName}
                </h3>
                <p className="text-gray-600">
                  <span className="font-medium">Flight Code:</span> {flight.flightCode}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Route:</span> {from.current.value} ✈️ {to.current.value}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Departure:</span> {flight.departureTime} |
                  <span className="font-medium ml-2">Arrival:</span> {flight.arrivalTime}
                </p>
              </div>
      
              {/* Right Section */}
              <div className="text-right space-y-2">
                <p className="text-2xl font-bold text-green-600">
                  <HiCurrencyRupee className="inline mb-1" />
                  {flight.price}
                </p>
                <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:scale-105 transform transition-all duration-200">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      )}
    </div>
  );
};
