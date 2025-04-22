import HotelCard from "./Card.jsx";
import Filter from "./Filter.jsx";
import { useContext } from "react";
import {HotelListContext} from '../../store/hotelStore.jsx';
const HotelList = () => {
  const { hotelList } = useContext(HotelListContext);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filter Section */}
      <div className="mb-6">
        <Filter />
      </div>

      {/* Hotel List */}
      {hotelList.length === 0 ? (
        <p className="text-center text-gray-600 text-lg font-medium">
          Sorry, no hotels to show.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotelList.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelList;