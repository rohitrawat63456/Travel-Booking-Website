import express from "express";
import {
  postAddHotel,
  getAllHotels,
  getHotelById,
} from "../Controllers/hotelController.js";
import { postBookHotel } from "../Controllers/hotelController.js";
import userauth from "../middleware/userAuth.js";
import { adminAuth } from "../middleware/adminAuth.js";
import multer from "multer";
const hotelRouter = express.Router();

const storage = multer.diskStorage({
  destination : function (req,file,cb) {
    return cb(null,'./uploads')``
  },
  filename: function (req,file,cb) {
    return cb(null,file.originalname);
  }
})
const upload = multer({storage});

hotelRouter.post(
  "/admin/add-hotel",
  upload.single("image"),
  adminAuth,
  postAddHotel
);
hotelRouter.get("/get-hotels-list", getAllHotels);
hotelRouter.get("/get-hotel-by-id/:hotelId", getHotelById);
hotelRouter.post("/bookHotel/:hotelId", userauth, postBookHotel);

export default hotelRouter;
