import { useContext} from "react";
import { HotelListContext } from "../../store/hotelStore";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';
import { UserDetailsInputForm } from "./UserDetailsInputFrom";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";
export const UserDetails = () => {
  const { userDetails } = useContext(HotelListContext);
  const navigate = useNavigate();
  const logoutHandler = async()=>{
    try{
      await fetch('http://localhost:8000/logout',{
        method:'POST',
        credentials:'include',
        "Content-Type":"application/json"
      }).then((res)=> res.json()).then((data)=>{
        return navigate('/');
      })
    }catch(error){
      toast.error('Error while logging out'.error);
    }
  }
  return (
    <>
    {!userDetails.Address ? <UserDetailsInputForm/> : (<div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      <div className="max-w-lg w-full bg-white bg-opacity-90 backdrop-blur-md shadow-xl rounded-xl p-6 border border-gray-300">
        {/* Profile Avatar */}
        <div className="flex flex-col items-center">
          <FaUserCircle className="text-blue-500 hover:text-purple-500 transition duration-300" size={90} />
          <h2 className="text-2xl font-semibold text-gray-800 mt-2">
            {userDetails?.name || "Guest User"}
          </h2>
          <p className="text-gray-500 text-sm">Welcome to your profile</p>
        </div>

        {/* Profile Details */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3 text-gray-700 bg-gray-100 p-3 rounded-lg">
            <FaEnvelope className="text-blue-500" />
            <p className="text-md">
              Email: <span className="font-medium">{userDetails?.email || "Not Provided"}</span>
            </p>
          </div>
          
            <div className="flex items-center gap-3 text-gray-700 bg-gray-100 p-3 rounded-lg">
              <FaPhone className="text-blue-500" />
              <p className="text-md">
                Contact: <span className="font-medium">{userDetails?.Contact || "Not Available"}</span>
              </p>
            </div>
            <div className="flex items-center gap-3 text-gray-700 bg-gray-100 p-3 rounded-lg">
              <FaMapMarkerAlt className="text-blue-500" />
              <p className="text-md">
                Address: <span className="font-medium">{userDetails?.Address || "Not Available"}</span>
              </p>
            </div>
          <div className="flex items-center gap-3 text-gray-700 bg-gray-100 p-3 rounded-lg">
            <FaCalendarAlt className="text-blue-500" />
            <p className="text-md">
              Joined: <span className="font-medium">{userDetails?.date || "Unknown"}</span>
            </p>
          </div>
        </div>
        {/* Actions */}
        <div className="mt-6 flex justify-center">
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded shadow-lg transform hover:scale-105 transition duration-300"
            onClick={() => logoutHandler()}
          >
            Log-out
          </button>
        </div>
      </div>
    </div>)}
    </>
  );
};