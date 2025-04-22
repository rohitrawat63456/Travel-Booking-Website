import UserProfileModel from "../Models/userModels/userProfile.js";
import BookingModel from "../Models/userModels/userBookings.js";
import ItineraryModel from "../Models/userModels/Itinerary.js";
export const postCompleteMyProfile = async (req, res) => {
  try {
    const { name, email, userId, Contact, Address } = req.body;
    console.log("Complete profile called", name, email, userId, Contact, Address);
    if (!name || !email || !userId || !Contact || !Address) {
      return res.json({
        success: false,
        message: "All fields required to complete your profile",
      });
    }

    const CompleteDetails = {
      name,
      email,
      userId,
      ContactDetails: Contact,
      ResidenceAddress: Address,
      joinDate:new Date(),
    };
    const existingProfile = await UserProfileModel.findOne({userId});
    const response = await UserProfileModel.findByIdAndUpdate(existingProfile._id,CompleteDetails,{new:true});
    if (response) {
      return res.json({ success: true, message: "Profile updated successfully" });
    }else{
      return res.json({ success: false, message: "some error occured"});
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await UserProfileModel.findOne({userId});
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({
      success: true,
      userData:{
        name:user.name,
        email:user.email,
        Address:user.ResidenceAddress,
        Contact:user.ContactDetails,
        date:user.joinDate
      },
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


export const getUserBookings = async(req,res)=>{
  try {
    console.log('get user bookings called');
    const {userId} = req.body;
    if(!userId){
      return res.json({ success: false, message: "User Id required to get bookings" });
    }
    const bookings = await BookingModel.findOne({userId});
    if(!bookings){
      return res.json({ success: false, message: "No bookings found" });
    }else{
      const hotels = bookings.hotelId;
      return res.json({ success: true, hotels });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
    
  }
}

export const postAddItinerary = async(req,res)=>{
  try {
    const {userId}= req.body;
    const itinerary = await ItineraryModel.findOne({userId});
    if(itinerary){
      return res.json({ success: false, message: "Itinerary already exists" });
    }
    const newitinerary = new ItineraryModel({
      userId,
      tripName:req.body.tripName,
      startDate:req.body.startDate,
      endDate:req.body.endDate,
      destination:req.body.destination,
      noOfDays:req.body.noOfDays,
      hotelName:req.body.hotelName,
      daysPlan:req.body.daysPlan
    })
    await newitinerary.save().then((itinerary)=>{
      console.log(itinerary);
      return res.json({ success: true, message: "Itinerary added" });
    })
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}


export const getUserItinerary = async(req,res)=>{ 
  try {
    const {userId} = req.body;
   const itinerary=  await ItineraryModel.findOne({userId});
   if(!itinerary){
     return res.json({ success: false, message: "No itinerary found" });
   }
    return res.json({ success: true, itinerary});

  } catch (error) {
    return res.json({ success: false, message: error.message });  
  }
}

export const postCancelBooking = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const { userId } = req.body;
    console.log("cancel booking called");
    console.log("hotelId", hotelId);
    console.log("userId", userId);
    const response = await BookingModel.findOne({ userId }); 
    const getUserBookings = response.hotelId;
    console.log("getUserBookings", getUserBookings);
    const updatedBookings = getUserBookings.filter((hotel) => hotel.hotelId !== hotelId);
    console.log("updatedBookings", updatedBookings);
   const result =  await BookingModel.findOneAndUpdate(
      { userId },
      { hotelId: updatedBookings },
      { new: true }
    );
    console.log("result is",result);
    return res.json({ success: true, message: "Booking cancelled successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}
