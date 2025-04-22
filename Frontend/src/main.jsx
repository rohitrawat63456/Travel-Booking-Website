import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {Bookings} from "./Components/UserComponents/MyBookings.jsx";
import HotelList from "./Components/UserComponents/HotelList.jsx";
import {AddHotel, PostAddHotelAction } from "./Components/AdminComponents/AddHotel.jsx";
import Details from "./Components/UserComponents/Details.jsx";
import { PlanItenary, postAddItinerary } from "./Components/UserComponents/PlanItenary.jsx";
import { UserDetails } from "./Components/UserComponents/UserDetails.jsx";
import WelcomePage from "./Pages/WelcomePage.jsx";
import {
  UserLoginPage,
  postUserLoginAction,
  postUserRegisterAction,
} from "./Pages/UserLoginPage.jsx";
import {
  AdminLoginPage,
  postAdminLoginAction,
  postAdminRegisterAction,
} from "./Pages/AdminLoginPage.jsx";
import { Flights } from "./Components/UserComponents/Flights.jsx";
import AdminHomePage from "./Components/AdminComponents/AdminHomePage.jsx";
import { AdminDashboard } from "./Components/AdminComponents/AdminDashboard.jsx";
import { AdminBookings } from "./Components/AdminComponents/AdminBookings.jsx";
import { AdminSettings } from "./Components/AdminComponents/AdminSettings.jsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
  },
  {
    path: "/user/:activity",
    element: <UserLoginPage />,
    action:({params,request})=>{
      if(params.activity==="login"){
        return postUserLoginAction({request})
      }
      else{
        return postUserRegisterAction({request})
      }

    },
  }
  ,
  {
    path: "/admin/:activity",
    element: <AdminLoginPage />,
    action: ({params,request})=>{
      if(params.activity==="login"){
        return postAdminLoginAction({request})
      }
      else{
        return postAdminRegisterAction({request})
      }
    }
  },{
    path: "/admin/home",
    element: <AdminHomePage />,
    children:[
      {
        path: "/admin/home",
        element: <AdminDashboard />,
        
      },
      {
        path: "/admin/home/add-Hotel",
        element: <AddHotel />,
        action: PostAddHotelAction,
      },{
        path: "/admin/home/bookings",
        element: <AdminBookings />,
      },{
        path:"/admin/home/settings",
        element:<AdminSettings/>
      }
    ]
  },

  {
    path: "/Home",
    element: <App />,
    children: [
      {
        path: "/Home",
        element: <HotelList />,
      },
      {
        path: "/Home/Bookings",
        element: <Bookings />,
      },
      {
        path: "/Home/details/:id",
        element: <Details />,
      },
      {
        path: "/Home/Hotels",
        element: <HotelList />,
      },
      {
        path: "/Home/Plan-Itinerary",
        element: <PlanItenary />,
        action: postAddItinerary,
      },
      {
        path: "/Home/myProfile",
        element: <UserDetails />,
      },
      {
        path: "/Home/Flights",
        element: <Flights />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes}></RouterProvider>
  </StrictMode>
);