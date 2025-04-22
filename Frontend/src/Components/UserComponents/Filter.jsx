import { useContext, useRef } from "react";
import { HotelListContext } from "../../store/hotelStore";
import { toast } from "react-toastify";
const Filter = () => {
  const { filterByPrice, filterByRating } = useContext(HotelListContext);
  const inputValue = useRef("");
  const handleFilterByPrice = () => {
    filterByPrice(Number(inputValue.current.value));
    inputValue.current.value = "";
  };
  const handleFilterByRating = () => {
    if((Number)(inputValue.current.value) > 5){
      toast.error("Please enter a valid Rating range");
      return;
    }
    filterByRating(Number(inputValue.current.value));
    inputValue.current.value = "";
  };
  const handleSearchByHotelName = () => {
    
  }
  return (
  <div className="flex flex-wrap items-center justify-center bg-white p-4 rounded-lg shadow-md">
    {/* Search Section */}
    {/* <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-md shadow-sm">
      <input
        type="text"
        placeholder="Search by Hotel Name"
        className="p-2 w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={() => handleSearchByHotelName()}
        className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md transition hover:bg-blue-600"
      >
        <FaSearch />
        <span>Search</span>
      </button>
    </div> */}

    {/* Filter Section */}
    <div className="flex items-center space-x-3 mt-4 md:mt-0 md:ml-6">
      <p className="text-gray-700 font-semibold">Filter By:</p>
      <input
        type="text"
        ref={inputValue}
        placeholder="Enter filter value"
        className="p-2 w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleFilterByPrice}
        className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md transition hover:bg-green-600"
      >
        Price
      </button>
      <button
        onClick={handleFilterByRating}
        className="bg-purple-500 text-white px-4 py-2 rounded-md shadow-md transition hover:bg-purple-600"
      >
        Ratings
      </button>
    </div>
  </div>
);
  
}  
export default Filter;
