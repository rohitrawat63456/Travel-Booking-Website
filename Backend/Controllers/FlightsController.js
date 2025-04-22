import FlightDataModel from "../Models/FlightsData.js";
export const getFlightsData = async (req, res) => {
  try {
    const { from, to } = req.body;
    console.log(from, to);
    if (!from || !to) {
      return res.json({ success: false, message: "All fields are required" });
    }
    const flights = await FlightDataModel.findOne({ "departureCity": from });
    if (!flights) {
      return res.json({
        success: false,
        message: "No flight operating to given city",
      });
    }
    console.log(flights);
    const flightsOperatingFromGivenCity = flights.flights.filter(
      (flight) => flight.city === to
    );
    if (flightsOperatingFromGivenCity == 0) {
      return res.json({
        success: false,
        message: "No flight operating to given city",
      });
    }    
    return res.json({ success: true, flightsOperatingFromGivenCity });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: "Interval server error" });
  }
};

export const postAddFlightData = async (req, res) => {
  const {  departureCity,destinations } = req.body;
  try {
    if (!departureCity || !destinations) {
      return res.json({ success: false, message: "All fields are required" });
    }
    const isAlreadyPresent = await FlightDataModel.findOne({
      departureCity
    });
    if (isAlreadyPresent) {
      console.log("Flight data already present", isAlreadyPresent);
      const destinationsData = isAlreadyPresent.flights;
      for (let i = 0; i < destinations.length; i++) {
        destinationsData.push(destinations[i]);
      }
      await FlightDataModel.updateOne(
        { departureCity },
        { flights: destinationsData }
      );
      return res.json({
        success: false,
        message: "Flight data Added Succesfully",
      });
    }
      const flightData = new FlightDataModel({
        departureCity,
        flights : destinations,
      });
      await flightData.save();
    res.json({ success: true, message: "Flight added successfully" });
  } catch (error) {
    console.error("Error adding flight:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
