import { Form } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const LoginSignUpFrom = ({activity,isUser}) => {
  const navigate = useNavigate();
return (
  <div className="flex justify-center items-center bg-gray-700 h-screen">
      <div
        className="container bg-white rounded-lg p-8 shadow-lg"
        style={{ width: "500px", height: "500px" }}
      >
        <h3 className="text-center text-xl font-bold mb-4 text-gray-800">
          Login to proceed
        </h3>
        <Form method="post">
          {activity == "signup" && (
            <div className="mb-4">
              <label
                htmlFor="UserName"
                className="block text-sm font-medium text-gray-700"
              >
                <b>User Name</b>
              </label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                id="UserName"
                name="name"
                placeholder="Enter your name"
              />
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              <b>Email</b>
            </label>
            <input
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              id="UserEmail"
              name="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              <b>Password</b>
            </label>
            <input
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              id="UserPassword"
              name="password"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {activity === "signup" ? "Register!" : "Login"}
          </button>
        </Form>
        {activity === "login" && (
          <p className="text-sm text-gray-600 mt-4 text-center">
            Forgot Password?
          </p>
        )}
        {activity === "signup" ? (
          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account?{" "}
            <span
              onClick={() => {
                navigate(`/${isUser ? "user" : "admin"}/login`);
              }}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-600 mt-4 text-center">
            Don't have an account?{" "}
            <span
              onClick={() => {
                navigate(`/${isUser ? "user" : "admin"}/signup`);
              }}
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Signup
            </span>
          </p>
        )}
      </div>
      <ToastContainer />
    </div>
)
}