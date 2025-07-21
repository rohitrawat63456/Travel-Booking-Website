import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
export const ItineraryInputForm = ({itineraryAddedHandler}) => {
  const [planByDay, setPlanByDay] = useState(false);
  const [days, setDays] = useState(0);
  const startDate = useRef(null);
  const endDate = useRef(null);
  const handleOnPlanByDay = () => {
    const newStartDate = new Date(startDate.current.value);
    const newEndDate = new Date(endDate.current.value);
    const timeDiff = newEndDate - newStartDate;
    const noOfdays = timeDiff / (24 * 60 * 60 * 1000);
    if (noOfdays > 0) {
      setDays(noOfdays);
      setPlanByDay(true);
    } else if (noOfdays < 0) {
      toast.error("Start Date Should be Before End Date");
    } else {
      toast.error("Provide Start and End Date");
    }
  };
  return (
    <div className="md:w-1/2 lg:w-1/3 p-8 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-white text-center">
        Plan Your Trip
      </h2>
      <Form method="POST" className="flex flex-col gap-6">
        <input
          type="text"
          placeholder="Trip Name"
          className="p-3 border border-gray-600 rounded-md bg-gray-900 text-gray-300 focus:ring-2 focus:ring-blue-500"
          name="tripName"
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="startDate" className="text-gray-400">
            Trip Start Date
          </label>
          <input
            type="date"
            className="p-3 border border-gray-600 rounded-md bg-green-300 text-white focus:ring-2 focus:ring-blue-500"
            name="startDate"
            id="startDate"
            ref={startDate}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="endDate" className="text-gray-400">
            Trip End Date 
          </label>
          <input
            type="date"
            className="p-3 border border-gray-600 rounded-md bg-green-300 text-white focus:ring-2 focus:ring-blue-500"
            name="endDate"
            ref={endDate}
            id="endDate"
          />
        </div>
        <input
          type="text"
          placeholder="Destination"
          className="p-3 border border-gray-600 rounded-md bg-gray-900 text-gray-300 focus:ring-2 focus:ring-blue-500"
          name="destination"
        />
        <input
          type="text"
          placeholder="Hotel Name"
          className="p-3 border border-gray-600 rounded-md bg-gray-900 text-gray-300 focus:ring-2 focus:ring-blue-500"
          name="hotelName"
        />
        <input type="hidden" value={days} name="noOfDays" />
        <button
          type="button"
          onClick={handleOnPlanByDay}
          className="bg-green-600 text-white font-semibold py-3 rounded hover:bg-green-700 transition"
        >
          Plan by Day
        </button>

        {planByDay && (
          <div className="space-y-6 mt-6">
            {Array.from({ length: days }).map((_, index) => (
              <div key={index} className="flex flex-col gap-2">
                <label
                  htmlFor={`day-${index + 1}`}
                  className="text-gray-400 font-medium"
                >
                  {`Enter your plan for Day ${index + 1}`}
                </label>
                <input
                  id={`day-${index + 1}`}
                  type="text"
                  placeholder={`Plan for Day ${index + 1}`}
                  name={`day-${index + 1}`}
                  required
                  className="p-3 border border-gray-600 rounded-md bg-gray-900 text-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition"
          onClick={()=>itineraryAddedHandler()}
        >
          Submit
        </button>
      </Form>
    </div>
  );
};
