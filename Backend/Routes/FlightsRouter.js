import express from 'express';
import { getFlightsData, postAddFlightData } from '../Controllers/FlightsController.js';
const FilghtRouter  = express.Router();
FilghtRouter.post('/getFlightsData',getFlightsData);
FilghtRouter.post('/addFlightData',postAddFlightData);
export default FilghtRouter;