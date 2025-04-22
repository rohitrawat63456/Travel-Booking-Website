import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  email: {
    type: String,
    required: true,
  },
  name: { type: String, required: true },
  ContactDetails: {
    type: Number,
  },
  ResidenceAddress: {
    type: String,
  },
  joinDate: {
    type: String,
  },
});

const UserProfileModel = mongoose.model("userProfileModel", profileSchema);
export default UserProfileModel;
