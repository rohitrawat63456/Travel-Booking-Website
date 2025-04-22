import { Link } from "react-router-dom";
import { IoAirplaneOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { useContext } from "react";
import { HotelListContext } from "../../store/hotelStore";
const Header = ({options}) => {
  const {userDetails} = useContext(HotelListContext);
  return (
    <>
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <Link to="/Home" className="flex items-center gap-2 text-blue-600 text-2xl font-bold">
        <IoAirplaneOutline size={32} />
        <span className="hidden sm:block">Bookify</span>
      </Link>

      <nav className="hidden md:flex space-x-6">
        {options.map((option) => (
          <Link
            key={option}
            to={`/Home/${option}`}
            className="text-gray-700 hover:text-blue-500 transition duration-300 text-lg font-medium"
          >
            {option}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <Link to="/Home/myProfile">
          <FaRegUserCircle className="text-gray-600 hover:text-blue-500 transition duration-300" size={32} />
        </Link>
        <p className="text-gray-700 font-medium">{userDetails.name}</p>
      </div>
    </header>
    </>
  );
};

export default Header;