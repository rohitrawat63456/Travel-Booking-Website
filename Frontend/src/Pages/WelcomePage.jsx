import { useNavigate } from "react-router-dom";
import { MdLogin } from "react-icons/md";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Navbar */}
        <div className="flex items-center justify-between py-4 px-6 bg-gray-900 bg-opacity-60 shadow-lg rounded-xl">
          <p className="text-3xl font-extrabold text-amber-400 tracking-wide">Bookify</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/user/login")}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-md transition duration-300 shadow-md hover:scale-105"
            >
              User Login <MdLogin size={20} />
            </button>
            <button
              onClick={() => navigate("/admin/login")}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-md transition duration-300 shadow-md hover:scale-105"
            >
              Business Account <MdLogin size={20} />
            </button>
          </div>
        </div>

        {/* Slogan */}
        <div className="mt-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">
            Explore the World with us
          </h1>
        </div>

        {/* Introduction */}
        <div className="mt-12 flex justify-center">
          <div className="max-w-3xl bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-xl shadow-lg">
            <p className="text-lg text-gray-200 leading-relaxed">
              Welcome to <span className="text-amber-400 font-semibold">Bookify</span> – your all-in-one travel companion. We're a passionate team of explorers, developers, and travel enthusiasts dedicated to making travel planning easier, smarter, and more personalized.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
