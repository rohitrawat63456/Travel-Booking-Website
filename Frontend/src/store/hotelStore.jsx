import { createContext, useState, useEffect } from "react";
export const HotelListContext = createContext({
  HotelList: [],
  filterByPrice: () => {},
  filterByRating: () => {},
  getHotelById: () => {},
  userDetails: "",
});
const HotelListContextProvider = (props) => {
  const [hotelList, setHotelList] = useState([]);
  const [userDetails, setUserDetails] = useState("");
  const filterByPrice = (price) => {
    const newList = hotelList.filter((hotel) => hotel.price <= price);
    setHotelList(newList);
  };
  const filterByRating = (rating) => {
    const newList = hotelList.filter((hotel) => hotel.rating <= rating);
    setHotelList(newList);
  };
  const getHotelById = (hotelId) => {
    let hotel = hotelList.filter((hotel) => hotel._id === hotelId);
    return hotel;
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await fetch("http://localhost:8000/getUserData", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((result) => result.json())
          .then((data) => {
            setUserDetails(data.userData);
          });
      } catch (error) {
        console.error("Error in fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/get-hotels-list")
      .then((result) => result.json())
      .then((data) => setHotelList(data))
      .catch((err) => console.log("some error occurred ", err));
  }, []);
  return (
    <HotelListContext.Provider
      value={{
        hotelList,
        filterByPrice,
        filterByRating,
        getHotelById,
        userDetails,
      }}
    >
      {props.children}
    </HotelListContext.Provider>
  );
};
export default HotelListContextProvider;
