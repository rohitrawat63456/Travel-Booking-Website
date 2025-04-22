import Hotel from "../Models/Hotel.js";
import BookingModel from "../Models/userModels/userBookings.js";
export const postAddHotel = async (req, res) => {
  try {
    const { name, price, location, rating,parking,capacity,wifi } = req.body;
    console.log(name,price,location,rating,parking,capacity,wifi);
    console.log(req.file);
    if (!name || !price || !location || !rating|| !wifi || ! capacity || ! parking) {
      return res.json({ success: false, error: "Missing required fields" });
    }

    const facilites = {
      parking,
      capacity,
      wifi
    } 
    const newHotel = new Hotel({ name, location, rating, price, imageUrl : req.file.path,facilites});
    await newHotel.save().then((result) => {
      res.status(201).json({ success:true,message: "Hotel added successfully!" });
    });
  } catch (error) {
    console.error("Error in postAddHotel:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllHotels = async (req, res) => {
  await Hotel.find()
    .then((hotels) => {
      res.json(hotels);
    })
    .catch((err) => {
      console.log("error in fetching hotels", err);
    });
};

export const getHotelById = async (req, res) => {
  try {
    const { hotelId } = req.params;
    console.log("get hotel by id called for", hotelId);
    if (!hotelId) {
      return res.json({ success: false, message: "Hotel Id required" });
    }
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.json({ success: false, message: "Hotel not found" });
    } else {
      return res.json({ success: true, hotel });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const postBookHotel = async (req, res) => {
  try {
    const { userId, checkInDate, checkOutDate, guests } = req.body;
    const { hotelId } = req.params;
    const bookings = await BookingModel.findOne({ userId });
    if (!bookings) {
      const hotel = [{ hotelId, checkInDate, checkOutDate, guests }];
      const newBooking = new BookingModel({ userId, hotelId: hotel });
      await newBooking.save().then(() => {
        return res.json({ success: true, message: "Hotel Booked" });
      });
    } else {
      const alreadyBookedHotels = bookings.hotelId;
      if (alreadyBookedHotels.includes(hotelId)) {
        return res.json({ success: false, message: "Hotel already booked" });
      }
      alreadyBookedHotels.push({
        hotelId,
        checkInDate,
        checkOutDate,
        guests,
      });
      bookings.hotelId = alreadyBookedHotels;
      await bookings.save().then((booking) => {
        return res.json({ success: true, message: "Hotel Booked" });
      });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
