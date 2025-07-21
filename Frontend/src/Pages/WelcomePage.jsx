import { useNavigate } from "react-router-dom";
import { MdLogin } from "react-icons/md";
import styles from './WelcomePage.module.Css';
const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className={`${styles["root_div"]}`}>
      <div className={`${styles["landing_page_outer_div"]}`}>
      <div className="flex items-center justify-between px-6 py-4 shadow-md">
        <p className="text-2xl font-bold text-white-600">Bookify</p>
        <span><a href="">about us</a></span>
        <span><a href="">explore</a></span>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/user/login")}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-white px-4 py-2 rounded-md transition duration-300"
          >
            User Login <MdLogin size={20} />
          </button>

          <button
            onClick={() => navigate("/admin/login")}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-white px-4 py-2 rounded-md transition duration-300"
          >
            Business Account <MdLogin size={20} />
          </button>
        </div>
      </div>
       <div className={`${styles["slogan_div"]}`}>
         <div>
          <h1 className={`${styles["slogan"]}`}>Explore the  World  with us</h1>
         </div>
       </div>
    </div>
    <div id="about_us">
      <h1>About us</h1>
    </div>
    </div>
    </>
  );
};
export default WelcomePage;