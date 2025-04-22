import express from "express";
import cors from "cors";
import connect from "./utils/dataBase.js";
import hotelRouter from "./Routes/HotelRouter.js";
import UserAuthRouter from "./Routes/UserAuthRouter.js";
import adminAuthRouter from "./Routes/AdminAuthRouter.js";
import FilghtRouter from "./Routes/FlightsRouter.js";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/UserRouter.js";
const app = express();
app.use(cors({
  origin: ['http://localhost:5175','http://localhost:5173','http://localhost:5174'],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use(userRouter);
app.use(UserAuthRouter);
app.use(hotelRouter);
app.use(FilghtRouter);
app.use(adminAuthRouter);

const PORT = 8000;
connect(() =>
  app.listen(PORT, () => {
    console.log("successfully connected");
    console.log(`server is running at http://localhost:${PORT}`);
  })
);
