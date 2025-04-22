import { useEffect, useState } from "react";
import { FaCalendarAlt, FaHotel, FaUser } from "react-icons/fa";

export const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  // Dummy data (replace with API call later)
  useEffect(() => {
    setBookings([
      {
        id: 1,
        hotel: "The Taj Palace",
        user: "Rohit Sharma",
        date: "2025-04-10",
        status: "Confirmed",
      },
      {
        id: 2,
        hotel: "Oberoi Grand",
        user: "Priya Mehta",
        date: "2025-04-12",
        status: "Pending",
      },
      {
        id: 3,
        hotel: "Leela Palace",
        user: "Amit Verma",
        date: "2025-04-15",
        status: "Cancelled",
      },
    ]);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Bookings</h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
        <table className="w-full table-auto text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="px-4 py-2">Booking ID</th>
              <th className="px-4 py-2">Hotel</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="bg-gray-50 hover:bg-gray-100 transition rounded-lg"
              >
                <td className="px-4 py-2 font-medium text-blue-700">
                  #{booking.id}
                </td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <FaHotel className="text-blue-600" />
                  {booking.hotel}
                </td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <FaUser className="text-green-600" />
                  {booking.user}
                </td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <FaCalendarAlt className="text-yellow-600" />
                  {booking.date}
                </td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
