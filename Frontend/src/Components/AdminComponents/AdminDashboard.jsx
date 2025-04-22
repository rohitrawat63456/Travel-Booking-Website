import { FaHotel, FaUsers, FaClipboardList, FaMoneyBill } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export const AdminDashboard = () => {
  const stats = [
    { label: "Total Hotels", count: 42, icon: <FaHotel /> },
    { label: "Total Users", count: 1250, icon: <FaUsers /> },
    { label: "Total Bookings", count: 340, icon: <FaClipboardList /> },
    { label: "Revenue", count: "₹5.6L", icon: <FaMoneyBill /> },
  ];

  const bookingsData = [
    { month: "Jan", bookings: 50 },
    { month: "Feb", bookings: 80 },
    { month: "Mar", bookings: 65 },
    { month: "Apr", bookings: 100 },
    { month: "May", bookings: 75 },
  ];

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map(({ label, count, icon }, index) => (
          <div key={index} className="bg-white shadow rounded-xl p-4 flex items-center gap-4">
            <div className="text-3xl text-blue-600">{icon}</div>
            <div>
              <h4 className="text-sm text-gray-500">{label}</h4>
              <p className="text-xl font-bold">{count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white p-6 shadow rounded-xl">
        <h2 className="text-lg font-semibold mb-4">Monthly Bookings</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bookingsData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="bookings" fill="#3B82F6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
