import { useNavigate } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import Header from "../Components/UserComponents/Header";

const WelcomePage = () => {
  const navigate = useNavigate();
  const options = ["about us", "Our Best Hotels"];
  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
  <p className="text-2xl font-bold text-blue-600">Bookify</p>

  <div className="flex items-center gap-4">
    <button
      onClick={() => navigate("/user/login")}
      className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-white px-4 py-2 rounded-md transition duration-300"
    >
     User Login <MdLogin size={20} />
    </button>

    <button
      onClick={() => navigate("/admin/login")}
      className="flex items-center gap-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-md transition duration-300"
    >
      Business Account <MdLogin size={20} />
    </button>
  </div>
</div>

<div className="w-full flex justify-center mt-8">
  <img
    src="https://static.vecteezy.com/system/resources/thumbnails/037/248/582/small/ai-generated-travelling-to-thailand-advertisment-background-with-copy-space-free-photo.jpg"
    alt="Travel"
    className="h-96 w-96 object-cover rounded-lg shadow-lg"
  />
</div>

    </>
  );
};

export default WelcomePage;
