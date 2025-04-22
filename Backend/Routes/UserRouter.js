import express from 'express';
import userauth from '../middleware/userAuth.js';
import { postCompleteMyProfile,getUserDetails,getUserBookings ,postAddItinerary,getUserItinerary,postCancelBooking} from '../Controllers/UserController.js';
const userRouter = express.Router();

userRouter.get('/getUserData',userauth,getUserDetails);
export default  userRouter;

userRouter.post('/completeMyProfile',userauth,postCompleteMyProfile);
userRouter.get('/getMyBookings',userauth,getUserBookings);
userRouter.post('/addItinerary',userauth,postAddItinerary);
userRouter.get('/getMyItinerary',userauth,getUserItinerary);
userRouter.delete('/cancel-booking/:hotelId',userauth,postCancelBooking);