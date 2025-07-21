import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  tripName: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  destination: { type: String, required: true },
  noOfDays: { type: Number, required: true },
  hotelName: { type: String, required: true },
  daysPlan :{type:Array}
});

const ItineraryModel = mongoose.model("Itinerary", itinerarySchema);
export default ItineraryModel;
