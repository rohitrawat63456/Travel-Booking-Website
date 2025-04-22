import mongoose from "mongoose";

const FlightDataSchema = new mongoose.Schema({
  departureCity:{type: String, required: true},
  flights:[
    {
      country : {type: String, required: true},
      flightCode:{type: String, required: true},
      flightName:{type: String, required: true},
      city:{type: String, required: true},
      departureTime:{type: String, required: true},
      arrivalTime:{type: String, required: true},
      price:{type: Number, required: true}
    }
  ]
});
const FlightDataModel = mongoose.model("FlightData", FlightDataSchema);
export default FlightDataModel;