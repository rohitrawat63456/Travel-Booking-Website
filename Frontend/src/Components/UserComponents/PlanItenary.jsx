import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MyItinerary } from "./MyItinerary";
import { ItineraryInputForm } from "./ItineraryInputForm";
export const PlanItenary = () => {
  const [itineraryDetails, setItineraryDetails] = useState(null);
  const [isItineraryAdded,setIsItineraryAdded] = useState(false);
  const itineraryAddedHandler = ()=>{
    console.log("itinerary setter called");
    setIsItineraryAdded(true);
  }
  useEffect(() => {
    console.log("useEffect called");
    fetch("http://localhost:8000/getMyItinerary", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          console.log(data.itinerary);
          setItineraryDetails(data.itinerary);
        }
      });
  }, [isItineraryAdded]);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-800 rounded-lg shadow-lg">
      <MyItinerary itinerary={itineraryDetails} />
      <ItineraryInputForm itineraryAddedHandler={itineraryAddedHandler} />
    </div>
  );
};

export const postAddItinerary = async (data) => {
  try {
    const formData = await data.request.formData();
    const itineraryData = Object.fromEntries(formData);
    const daysPlan = [];
    for (let i = 1; i <= parseInt(itineraryData.noOfDays); i++) {
      daysPlan.push(itineraryData[`day-${i}`]);
    }
    itineraryData.daysPlan = daysPlan;
    await fetch("http://localhost:8000/addItinerary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(itineraryData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("Itinerary Added Successfully!", data);
          toast.success("Itinerary Added Successfully!");
        } else {
          console.log("Failed to add itinerary!", data);
          toast.error("Failed to add itinerary!");
        }
      });
  } catch (error) {
    toast.error(error.message);
  }
};
