import { Link, Outlet, useLocation } from "react-router-dom";
import { FaHotel, FaUsers, FaClipboardList, FaCog, FaHome } from "react-icons/fa";

const AdminHomePage = () => {
  const location = useLocation();

  const links = [
    { path: "/admin/home", label: "Dashboard", icon: <FaHome /> },
    { path: "/admin/home/add-hotel", label: "Add Hotel", icon: <FaHotel /> },
    { path: "/admin/home/bookings", label: "Manage Bookings", icon: <FaClipboardList /> },
    { path: "/admin/home/settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-blue-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-br from-blue-800 to-blue-900 text-white p-6 shadow-xl space-y-6 rounded-r-3xl">
        <h2 className="text-3xl font-bold text-center mb-8 tracking-wide">Admin Panel</h2>
        <nav className="space-y-3">
          {links.map(({ path, label, icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-4 px-4 py-2 rounded-lg text-lg font-medium transition-all duration-300 ${
                location.pathname === path
                  ? "bg-white text-blue-800 shadow-md"
                  : "hover:bg-blue-700 hover:text-white"
              }`}
            >
              <span className="text-xl">{icon}</span>
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-extrabold text-blue-800 mb-6 drop-shadow">
          Welcome, Admin
        </h1>
        <div className="bg-white p-6 rounded-xl shadow-lg min-h-[70vh]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
