import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [bookedHotels, setBookedHotels] = useState([]);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:8000/getMyBookings", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await res.json();
        console.log("response for fetch bookings",data)
        setBookings(Array.isArray(data.hotels) ? data.hotels : []);
      } catch (error) {
        toast.error("Error in fetching bookings: " + error.message);
      }
    };
    fetchBookings();
  }, []);
  const handleCancelBooking = async (hotelId) => {
    try {
    const res =   await fetch(`http://localhost:8000/cancel-booking/${hotelId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
    const data = await res.json();
    if(data.success){
      toast.success("Booking cancelled successfully");
      setBookings((prevBookings) => prevBookings.filter((id) => id !== hotelId));
    }else{
      toast.error("Error in cancelling booking"+data.message)
    }   
    } catch (error) {
      toast.error("Error in cancelling booking: ");
    }
  };

  useEffect(() => {
    const fetchHotelDetails = async () => {
      if (bookings.length === 0) return;
      try {
        console.log("bookings are ",bookings);
        const hotelPromises = bookings.map(async (hotel) => {
          console.log("calling hotel data for ",hotel);
          const res = await fetch(
            `http://localhost:8000/get-hotel-by-id/${hotel.hotelId}`
          );
          const data = await res.json();
          const hotelData = data.hotel;
          console.log("hotel data is",hotelData)
          return {
            checkInDate:hotel.checkInDate,
            checkOutDate:hotel.checkOutDate,
            guests:hotel.guests,
            ...hotelData
          };
        });
        const bookedHotelsData = await Promise.all(hotelPromises);
        setBookedHotels(bookedHotelsData);
      } catch (error) {
        toast.error("Error in fetching hotel details: " + error.message);
      }
    };

    fetchHotelDetails();
  }, [bookings]);
  return (
    <>
  <div className="p-6 min-h-screen bg-gray-100">
    {bookedHotels.length === 0 ? (
      <p className="text-center text-gray-600 text-xl font-medium">No Bookings Yet</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {bookedHotels.map((hotel,index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <img
              src={`http://localhost:8000/${hotel.imageUrl}`}
              alt={hotel.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-5 space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">{hotel.name}</h2>
              <p className="text-sm text-gray-500 italic">{hotel.location}</p>

              <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                <p><span className="font-semibold">Check-in:</span> {hotel.checkInDate}</p>
                <p><span className="font-semibold">Check-out:</span> {hotel.checkOutDate }</p>
                <p><span className="font-semibold">Guests:</span> {hotel.guests}</p>
              </div>
            </div>

            <div className="px-5 pb-5 mt-auto">
              <button
                onClick={() => {+
                  handleCancelBooking(hotel._id)}}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition duration-300"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</>
  );
};

