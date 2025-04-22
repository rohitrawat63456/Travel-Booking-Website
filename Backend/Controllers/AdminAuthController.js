import AdminModel from "../Models/adminModels/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const postAdminRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Please fill all fields" });
    }
    console.log("Register called for this ", req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new AdminModel({
      name,
      email,
      password: hashedPassword,
    });
     await newAdmin.save();
    return res.json({
      success: true,
      message: "Admin registered successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: "Error in admin register" });
  }
};
export const postAdminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "Please fill all fields" });
    }
    const user = await AdminModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }
    const token= jwt.sign(
      { id: user._id },
      process.env.JWT_ADMIN_SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });
    return res.json({ success: true, message: "Admin logged in successfully" });
  } catch (error) {
    console.log(error.message);
    return res.json({success: false, message: "Error in admin login"});
  }
};
