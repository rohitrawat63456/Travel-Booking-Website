import { FcRating } from "react-icons/fc";
import { HiCurrencyRupee } from "react-icons/hi2";
import { Link } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  return (
    <div className="bg-gray-100 rounded-xl shadow-md p-4 mb-6 transition-transform transform hover:scale-105 hover:shadow-lg duration-300">
      <div className="overflow-hidden rounded-t-xl">
        <img
          src={`http://localhost:8000/${hotel.imageUrl}`}
          className="w-full h-48 object-cover rounded-t-xl transition-transform duration-300 hover:scale-110"
          alt={hotel.name}
        />
      </div>
      <div className="p-4">
        <h5 className="text-2xl font-bold text-gray-800 mb-2">{hotel.name}</h5>
        <p className="text-gray-600 mb-2">
          <strong>Price:</strong>{" "}
          <HiCurrencyRupee className="inline text-green-600" /> {hotel.price}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Location:</strong> {hotel.location}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Rating:</strong> {hotel.rating}{" "}
          <FcRating className="inline text-yellow-500" />
        </p>
        <Link to={`/Home/details/${hotel._id}`}>
          <button
            type="button"
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 px-4 rounded-lg w-full transform transition-all duration-300 hover:scale-105 hover:from-blue-600 hover:to-blue-800"
          >
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HotelCard;
