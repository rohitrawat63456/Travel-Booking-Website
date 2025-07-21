import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { HotelListContext } from "../../store/hotelStore";
import { TbHomeFilled } from "react-icons/tb";
import { HiCurrencyRupee } from "react-icons/hi";
import { toast } from "react-toastify";
const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const CheckInDate = useRef(null);
  const CheckOutDate = useRef(null);
  const Guests = useRef(null);
  const { getHotelById } = useContext(HotelListContext);
  const [hotel, setHotel] = useState(null);
  const [book, setBook] = useState(false);
  const onCompleteMyBookingHandler = async () => {
    try {
      const checkInDate = CheckInDate.current.value;
      const checkOutDate = CheckOutDate.current.value;
      const guests = Guests.current.value;
      console.log(checkInDate, checkOutDate, guests);
      if (!checkInDate || !checkOutDate || !guests) {
        return toast.error("Please fill all the fields");
      }
      const bookingDetails = {
        checkInDate,
        checkOutDate,
        guests,
      };
      console.log("booking Details", bookingDetails);
      await fetch(`http://localhost:8000/bookHotel/${id}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingDetails),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            toast.success(data.message);
            return navigate("/Home/Bookings");
          }
          return toast.error(data.message);
        });
    } catch (error) {
      toast.error("Error while booking hotel");
    }
  };

  useEffect(() => {
    const data = getHotelById(id);
    if (data && data[0]) {
      setHotel(data[0]);
    }
    console.log(typeof data, data);
  }, [id, getHotelById]);

  return !hotel ? (
    <p className="text-center text-gray-500 text-lg">Loading...</p>
  ) : (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center bg-white shadow-md rounded-lg p-6">
        <div className="w-full">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {hotel.name}
          </h3>
          <p className="text-gray-600 mb-4">{hotel.location}</p>
          <p className="mb-2">
            <strong>Rating:</strong> {hotel.rating} ⭐
          </p>
          <p className="mb-2">
            <strong>parking:</strong> {hotel.facilites.parking}
          </p>
          <p className="mb-2">
            <strong>wifi:</strong> {hotel.facilites.wifi}
          </p>
          <p className="mb-2">
            <strong>capacity:</strong> {hotel.facilites.capacity}
          </p>
          <p className="mb-4">
            <strong>Price per night:</strong>
            <HiCurrencyRupee className="inline text-green-600" /> {hotel.price}
          </p>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
            onClick={() => setBook(true)}
          >
            Book <TbHomeFilled className="ml-2" />
          </button>
        </div>
      </div>
      {book && (
        <div
          className="mt-6 bg-green-50 border border-green-300 text-green-800 px-6 py-5 rounded-xl shadow-md"
          role="alert"
        >
          <label
            htmlFor="CheckInDate"
            className="block text-sm font-semibold mb-2"
          >
            Check-in Date
          </label>
          <input
            type="date"
            ref={CheckInDate}
            id="CheckInDate"
            className="w-full p-2 border border-green-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <label
            htmlFor="CheckOutDate"
            className="block text-sm font-semibold mb-2"
          >
            Check-out Date
          </label>
          <input
            type="date"
            ref={CheckOutDate}
            id="CheckOutDate"
            className="w-full p-2 border border-green-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <label htmlFor="Guests" className="block text-sm font-semibold mb-2">
            Number of Guests
          </label>
          <input
            type="Number"
            ref={Guests}
            min="1"
            id="Guests"
            className="w-full p-2 border border-green-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={() => onCompleteMyBookingHandler()}
            className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 transition-all font-medium"
          >
            Complete My Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default Details;