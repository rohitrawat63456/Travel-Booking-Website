import User from "../Models/userModels/Users.js"
import UserProfileModel from "../Models/userModels/userProfile.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const postUserRegister = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({success:false, message: "Missing required fields" });
  }
  try {
    //encrypting password using bcrypt with 10 rounds of salting
    const hasedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hasedPassword });
    const userAlready =await User.findOne({ email });
    if (userAlready) {
      return res.json({success:false, message: "User already exists" });
    }
    const response = await newUser.save();
    const user = response.toJSON();
    console.log("new user saved",user);
    const newUserProfile = new UserProfileModel({
      userId: user._id,
      email: user.email,
      name: user.name,
      ContactDetails: "",
      ResidenceAddress: "",
      joinDate: new Date(),
    });
   await newUserProfile.save();
    return res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.log("Error in postUserRegister:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log("Missing required fields");
      return res.json({ success: false, error: "Missing required fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.json({success:false, message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_USER_SECRET_KEY, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "User logged in successfully" });
  } catch (error) {
    console.log("Error in postUserLogin:", error);
    return res.json({ success: false, error: "Internal server error" });
  }
};

export const postIsUserAuthenticated = (req, res) => {
  try {
    const { userId } = req.body;
    const user = User.findById(userId);
    if (user) {
      res.json({ success: true, message: "user is authenticated" });
    } else {
      res.json({ success: false, message: "user is not Authenticated" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const postuserLogout = async (req,res)=>{
  try {
    const {token} =req.cookies;
    if(!token){
      return res.json({success:false,message:"User not logged in"});
    }
    res.clearCookie('token');
    return res.json({success:true,message:"User logged out successfully"});
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}
