import { ToastContainer } from "react-toastify";
import Header from "./Components/UserComponents/Header";
import { Outlet } from "react-router-dom";
import HotelListContextProvider from "./store/hotelStore";
function App() {
  const options = ["Hotels", "Flights", "Bookings", "Plan-Itinerary"];
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-blue-100">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <HotelListContextProvider>
        <Header options={options} />
        <main className="flex-1 container mx-auto px-4 py-6">
          <Outlet />
        </main>
      </HotelListContextProvider>
      <footer className="bg-blue-700 text-white text-center py-4 mt-auto shadow-md">
        <p className="text-sm">
          © <span className="font-semibold">Travel Booking Website</span>. All
          rights reserved.
        </p>
      </footer>
    </div>
  );
}
export default App;
