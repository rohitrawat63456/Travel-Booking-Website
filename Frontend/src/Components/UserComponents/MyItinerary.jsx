import {
  RiCalendar2Fill,
  RiMapPin2Fill,
  RiTimeFill,
  RiHotelFill,
} from "react-icons/ri";
export const MyItinerary = ({itinerary}) => {
  return (
    <div className="md:w-2/3 p-6 bg-gray-700 rounded-lg shadow-md">
      {!itinerary ? (
        <p className="text-gray-300 text-center text-lg font-medium">
          Your itinerary will be displayed here.
        </p>
      ) : (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white space-y-6">
          <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center">
            {itinerary.tripName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3 bg-gray-900 p-4 rounded-lg">
              <RiCalendar2Fill className="w-6 h-6 text-blue-400" />
              <p className="text-gray-300 text-lg">
                Start Date: <span className="font-semibold">{itinerary.startDate}</span>
              </p>
            </div>
            <div className="flex items-center space-x-3 bg-gray-900 p-4 rounded-lg">
              <RiCalendar2Fill className="w-6 h-6 text-red-400" />
              <p className="text-gray-300 text-lg">
                End Date: <span className="font-semibold">{itinerary.endDate}</span>
              </p>
            </div>
            <div className="flex items-center space-x-3 bg-gray-900 p-4 rounded-lg">
              <RiMapPin2Fill className="w-6 h-6 text-green-400" />
              <p className="text-gray-300 text-lg">
                Destination: <span className="font-semibold">{itinerary.destination}</span>
              </p>
            </div>
            <div className="flex items-center space-x-3 bg-gray-900 p-4 rounded-lg">
              <RiTimeFill className="w-6 h-6 text-yellow-400" />
              <p className="text-gray-300 text-lg">
                Duration: <span className="font-semibold">{itinerary.noOfDays} Days</span>
              </p>
            </div>
            <div className="flex items-center space-x-3 bg-gray-900 p-4 rounded-lg col-span-2">
              <RiHotelFill className="w-6 h-6 text-purple-400" />
              <p className="text-gray-300 text-lg">
                Hotel: <span className="font-semibold">{itinerary.hotelName}</span>
              </p>
            </div>
          </div>
          {/* Days Plan */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">Daily Plan</h3>
            <div className="space-y-3">
              {itinerary.daysPlan.map((day, index) => (
                <div key={index} className="flex items-center space-x-3 bg-gray-800 p-4 rounded-lg">
                  <RiTimeFill className="w-5 h-5 text-yellow-400" />
                  <p className="text-gray-300 text-lg">
                    Day {index + 1}: <span className="font-medium">{day}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
}