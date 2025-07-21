import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connect = (callback) => {
  mongoose.connect("mongodb+srv://rohitrawat952:rohit@clusterforvolunteermana.tay9n.mongodb.net/?retryWrites=true&w=majority&appName=ClusterforVolunteerManagment")
    .then(() => {
      console.log("successfully connected to database");
      callback();
    })
    .catch((err) => {
      console.log("error while connecting to database", err);
    });
};
export default connect;
