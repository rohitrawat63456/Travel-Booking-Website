import { useState } from "react";
import { FaBell, FaUserCog, FaTools } from "react-icons/fa";

export const AdminSettings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Settings</h2>

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <FaUserCog /> Profile Settings
          </h3>
          <div className="space-y-2">
            <label className="block">
              <span className="text-gray-700">Full Name</span>
              <input
                type="text"
                defaultValue="Admin User"
                className="mt-1 block w-full px-4 py-2 border rounded-md"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Email</span>
              <input
                type="email"
                defaultValue="admin@example.com"
                className="mt-1 block w-full px-4 py-2 border rounded-md"
              />
            </label>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Update Profile
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <FaBell /> Notification Settings
          </h3>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              className="h-5 w-5"
            />
            <span className="text-gray-700">Enable email notifications</span>
          </label>
        </div>

        {/* System Settings */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <FaTools /> System Settings
          </h3>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              className="h-5 w-5"
            />
            <span className="text-gray-700">Enable Dark Mode</span>
          </label>
        </div>
      </div>
    </div>
  );
};
