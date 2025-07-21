import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  facilites: {
    type: {
      parking: { type: String, required: true },
      wifi: { type: String, required: true },
      capacity: { type: Number, required: true },
    },
    require:true
  },
});

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;
